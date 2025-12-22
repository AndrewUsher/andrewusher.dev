import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSimulatedDO } from './hooks/useSimulatedDO'
import { ConnectionNode } from './shared/ConnectionNode'
import { AnimatedPacket } from './shared/AnimatedPacket'
import { EventTimeline } from './shared/EventTimeline'
import type { Position } from './types'

// Calculate positions for client nodes in a circle around the DO
const getClientPosition = (index: number, total: number, center: Position, radius: number): Position => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: center.x + radius * Math.cos(angle) - 32, // Offset for node width
    y: center.y + radius * Math.sin(angle) - 32  // Offset for node height
  }
}

export default function DashboardArchitectureDemo() {
  const { state, events, packets, clients, addClient, removeClient, sendMessage, broadcastMessage, reset } = useSimulatedDO({
    hibernationTimeout: 5000,
    maxConnections: 6
  })

  const [autoSend, setAutoSend] = useState(false)

  // Layout configuration
  const canvasWidth = 600
  const canvasHeight = 400
  const doPosition: Position = { x: canvasWidth / 2 - 32, y: canvasHeight / 2 - 32 }
  const clientRadius = 140

  // Auto-send messages
  useEffect(() => {
    if (!autoSend || clients.length === 0) return

    const interval = setInterval(() => {
      const randomClient = clients[Math.floor(Math.random() * clients.length)]
      if (randomClient.status === 'connected') {
        sendMessage(randomClient.id, {
          type: 'metric',
          value: Math.random() * 100
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [autoSend, clients, sendMessage])

  return (
    <div className="my-8 p-6 bg-white dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-neutral-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Durable Object Architecture
      </h3>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visualization Canvas */}
        <div>
          <div className="mb-4">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Interactive Architecture Diagram
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Add clients to see them connect. Click clients to remove them.
            </div>
          </div>

          <div
            className="relative bg-slate-50 dark:bg-neutral-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-neutral-600 overflow-hidden"
            style={{ width: canvasWidth, height: canvasHeight }}
          >
            {/* Durable Object node */}
            <ConnectionNode
              id="durable-object"
              label="Durable Object"
              status={state.isHibernating ? 'hibernating' : clients.length > 0 ? 'connected' : 'disconnected'}
              position={doPosition}
            />

            {/* Client nodes */}
            <AnimatePresence>
              {clients.map((client, index) => {
                const position = getClientPosition(index, Math.max(clients.length, 3), { x: canvasWidth / 2, y: canvasHeight / 2 }, clientRadius)
                return (
                  <ConnectionNode
                    key={client.id}
                    id={client.id}
                    label={client.name}
                    status={client.status}
                    position={position}
                    onClick={() => removeClient(client.id)}
                  />
                )
              })}
            </AnimatePresence>

            {/* Animated packets */}
            <AnimatePresence>
              {packets.map(packet => {
                const fromIsClient = packet.from.startsWith('client-')
                const toIsClient = packet.to.startsWith('client-')

                let fromPos: Position
                let toPos: Position

                if (fromIsClient) {
                  const clientIndex = clients.findIndex(c => c.id === packet.from)
                  fromPos = clientIndex >= 0
                    ? getClientPosition(clientIndex, Math.max(clients.length, 3), { x: canvasWidth / 2, y: canvasHeight / 2 }, clientRadius)
                    : doPosition
                  fromPos = { x: fromPos.x + 32, y: fromPos.y + 32 } // Center of node
                } else {
                  fromPos = { x: doPosition.x + 32, y: doPosition.y + 32 }
                }

                if (toIsClient) {
                  const clientIndex = clients.findIndex(c => c.id === packet.to)
                  toPos = clientIndex >= 0
                    ? getClientPosition(clientIndex, Math.max(clients.length, 3), { x: canvasWidth / 2, y: canvasHeight / 2 }, clientRadius)
                    : doPosition
                  toPos = { x: toPos.x + 32, y: toPos.y + 32 } // Center of node
                } else {
                  toPos = { x: doPosition.x + 32, y: doPosition.y + 32 }
                }

                return (
                  <AnimatedPacket
                    key={packet.id}
                    packet={packet}
                    from={fromPos}
                    to={toPos}
                  />
                )
              })}
            </AnimatePresence>

            {/* Status overlay */}
            {clients.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-neutral-800/80">
                <div className="text-center">
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    No clients connected
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Add a client to get started
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-100 dark:bg-neutral-800 rounded">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {clients.length}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Clients</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-neutral-800 rounded">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {state.messageCount}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Messages</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-neutral-800 rounded">
              <div className={`text-2xl font-bold ${state.isHibernating ? 'text-gray-600 dark:text-gray-400' : 'text-green-600 dark:text-green-400'}`}>
                {state.isHibernating ? '💤' : '⚡'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {state.isHibernating ? 'Hibernating' : 'Active'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Events */}
        <div className="flex flex-col gap-4">
          {/* Controls */}
          <div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Controls
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => addClient('websocket')}
                  disabled={clients.length >= 6}
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  + Add WebSocket Client
                </button>
                <button
                  onClick={() => addClient('sse')}
                  disabled={clients.length >= 6}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  + Add SSE Client
                </button>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const connectedClients = clients.filter(c => c.status === 'connected')
                    if (connectedClients.length > 0) {
                      const randomClient = connectedClients[Math.floor(Math.random() * connectedClients.length)]
                      sendMessage(randomClient.id, { type: 'ping', timestamp: Date.now() })
                    }
                  }}
                  disabled={clients.filter(c => c.status === 'connected').length === 0}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Send Random Message
                </button>

                <button
                  onClick={() => broadcastMessage({ type: 'announcement', text: 'Hello all clients!' })}
                  disabled={clients.filter(c => c.status === 'connected').length === 0}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Broadcast to All
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSend}
                    onChange={(e) => setAutoSend(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Auto-send messages
                  </span>
                </label>

                <button
                  onClick={reset}
                  className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Event Log
            </div>
            <EventTimeline events={events} height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}
