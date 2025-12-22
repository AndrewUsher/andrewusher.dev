import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ConnectionType } from './types'

interface ConnectionInfo {
  type: ConnectionType
  name: string
  description: string
  pros: string[]
  cons: string[]
  pattern: 'bidirectional' | 'unidirectional' | 'request-response'
}

const connectionTypes: ConnectionInfo[] = [
  {
    type: 'websocket',
    name: 'WebSocket',
    description: 'Full-duplex communication channel over a single TCP connection',
    pros: [
      'Bidirectional real-time communication',
      'Low latency',
      'Efficient for high-frequency updates',
      'Works with Hibernation API'
    ],
    cons: [
      'More complex error handling',
      'Requires WebSocket server support',
      'Connection can be dropped by proxies'
    ],
    pattern: 'bidirectional'
  },
  {
    type: 'sse',
    name: 'Server-Sent Events',
    description: 'Server-to-client streaming over HTTP',
    pros: [
      'Simple HTTP-based protocol',
      'Automatic reconnection',
      'Event IDs for resumption',
      'Works through most proxies'
    ],
    cons: [
      'Unidirectional (server → client only)',
      'Limited browser connection pool',
      'Text-based (no binary data)'
    ],
    pattern: 'unidirectional'
  },
  {
    type: 'polling',
    name: 'HTTP Polling',
    description: 'Periodic requests to check for updates',
    pros: [
      'Simple to implement',
      'Works everywhere',
      'No special server requirements'
    ],
    cons: [
      'High latency',
      'Inefficient bandwidth usage',
      'Increased server load',
      'Not truly real-time'
    ],
    pattern: 'request-response'
  }
]

const patternVisuals = {
  bidirectional: (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <div className="h-1 w-16 bg-sky-500 rounded" />
        <div className="h-1 w-16 bg-sky-500 rounded" />
      </div>
      <span className="text-sky-500">⟷</span>
      <div className="text-xs text-slate-600 dark:text-slate-400">Two-way</div>
    </div>
  ),
  unidirectional: (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 bg-emerald-500 rounded" />
      <span className="text-emerald-500">→</span>
      <div className="text-xs text-slate-600 dark:text-slate-400">One-way</div>
    </div>
  ),
  'request-response': (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <div className="h-1 w-12 bg-orange-500 rounded" />
        <div className="h-1 w-8 bg-orange-300 rounded ml-4" />
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-400">Req/Res</div>
    </div>
  )
}

export default function ConnectionTypesDemo() {
  const [selected, setSelected] = useState<ConnectionType>('websocket')

  const selectedInfo = connectionTypes.find(ct => ct.type === selected)!

  return (
    <div className="my-8 p-6 bg-white dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-neutral-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Connection Types Comparison
      </h3>

      {/* Tab selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {connectionTypes.map(ct => (
          <button
            key={ct.type}
            onClick={() => setSelected(ct.type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selected === ct.type
                ? 'bg-sky-500 text-white'
                : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
            }`}
          >
            {ct.name}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {/* Description */}
        <div className="p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            {selectedInfo.description}
          </p>
        </div>

        {/* Pattern visualization */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Communication Pattern:
          </span>
          {patternVisuals[selectedInfo.pattern]}
        </div>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Pros */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
              <span className="text-lg">✓</span>
              Advantages
            </h4>
            <ul className="space-y-1">
              {selectedInfo.pros.map((pro, index) => (
                <li
                  key={index}
                  className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2"
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
              <span className="text-lg">✗</span>
              Limitations
            </h4>
            <ul className="space-y-1">
              {selectedInfo.cons.map((con, index) => (
                <li
                  key={index}
                  className="text-sm text-red-800 dark:text-red-200 flex items-start gap-2"
                >
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Use case recommendation */}
        <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
          <h4 className="font-semibold text-sky-900 dark:text-sky-300 mb-2">
            Best For:
          </h4>
          <p className="text-sm text-sky-800 dark:text-sky-200">
            {selected === 'websocket' && 'Real-time bidirectional apps: chat, collaborative editing, live dashboards, multiplayer games'}
            {selected === 'sse' && 'Server-to-client updates: live feeds, notifications, progress updates, monitoring dashboards'}
            {selected === 'polling' && 'Low-frequency updates, legacy systems, or when simpler protocols are sufficient'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
