import { useState, useCallback, useRef, useEffect } from 'react'
import type { Client, StreamEvent, DurableObjectState, ConnectionType, DataPacket } from '../types'

interface UseSimulatedDOOptions {
  hibernationTimeout?: number
  maxConnections?: number
}

export function useSimulatedDO(options: UseSimulatedDOOptions = {}) {
  const { hibernationTimeout = 10000, maxConnections = 10 } = options

  const [state, setState] = useState<DurableObjectState>({
    connections: new Map(),
    isHibernating: false,
    lastActivity: Date.now(),
    messageCount: 0
  })

  const [events, setEvents] = useState<StreamEvent[]>([])
  const [packets, setPackets] = useState<DataPacket[]>([])

  const hibernationTimerRef = useRef<NodeJS.Timeout>()
  const clientCounterRef = useRef(0)

  const addEvent = useCallback((event: Omit<StreamEvent, 'id' | 'timestamp'>) => {
    const newEvent: StreamEvent = {
      ...event,
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now()
    }
    setEvents(prev => [...prev, newEvent].slice(-100))
    return newEvent
  }, [])

  const addPacket = useCallback((from: string, to: string, data: any) => {
    const packet: DataPacket = {
      id: Math.random().toString(36).slice(2),
      from,
      to,
      data,
      timestamp: Date.now()
    }
    setPackets(prev => [...prev, packet])
    // Auto-remove packet after animation
    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== packet.id))
    }, 1000)
    return packet
  }, [])

  const resetHibernationTimer = useCallback(() => {
    if (hibernationTimerRef.current) {
      clearTimeout(hibernationTimerRef.current)
    }

    hibernationTimerRef.current = setTimeout(() => {
      setState(prev => {
        if (prev.connections.size === 0 && !prev.isHibernating) {
          addEvent({ type: 'hibernate', message: 'Entering hibernation mode' })
          return { ...prev, isHibernating: true }
        }
        return prev
      })
    }, hibernationTimeout)
  }, [hibernationTimeout, addEvent])

  const addClient = useCallback((type: ConnectionType = 'websocket'): Client | null => {
    if (state.connections.size >= maxConnections) {
      addEvent({ type: 'error', message: `Maximum connections (${maxConnections}) reached` })
      return null
    }

    const wasHibernating = state.isHibernating

    const client: Client = {
      id: `client-${++clientCounterRef.current}`,
      name: `Client ${clientCounterRef.current}`,
      type,
      status: 'connecting',
      connectedAt: Date.now(),
      lastActivity: Date.now()
    }

    setState(prev => {
      const newConnections = new Map(prev.connections)
      newConnections.set(client.id, client)
      return {
        ...prev,
        connections: newConnections,
        isHibernating: false,
        lastActivity: Date.now()
      }
    })

    if (wasHibernating) {
      addEvent({ type: 'resume', message: 'Resumed from hibernation' })
    }

    addEvent({
      type: 'connect',
      clientId: client.id,
      message: `${client.name} connecting via ${type.toUpperCase()}`
    })

    // Simulate connection handshake delay
    setTimeout(() => {
      setState(prev => {
        const newConnections = new Map(prev.connections)
        const existingClient = newConnections.get(client.id)
        if (existingClient) {
          newConnections.set(client.id, { ...existingClient, status: 'connected' })
        }
        return { ...prev, connections: newConnections }
      })
      addEvent({
        type: 'connect',
        clientId: client.id,
        message: `${client.name} connected successfully`
      })
    }, 300 + Math.random() * 500)

    resetHibernationTimer()
    return client
  }, [state.connections.size, state.isHibernating, maxConnections, addEvent, resetHibernationTimer])

  const removeClient = useCallback((clientId: string) => {
    setState(prev => {
      const client = prev.connections.get(clientId)
      if (!client) return prev

      const newConnections = new Map(prev.connections)
      newConnections.delete(clientId)

      addEvent({
        type: 'disconnect',
        clientId,
        message: `${client.name} disconnected`
      })

      return {
        ...prev,
        connections: newConnections,
        lastActivity: Date.now()
      }
    })

    resetHibernationTimer()
  }, [addEvent, resetHibernationTimer])

  const sendMessage = useCallback((fromClientId: string, data: any) => {
    const client = state.connections.get(fromClientId)
    if (!client) return

    // Update client activity
    setState(prev => {
      const newConnections = new Map(prev.connections)
      const updatedClient = newConnections.get(fromClientId)
      if (updatedClient) {
        newConnections.set(fromClientId, { ...updatedClient, lastActivity: Date.now() })
      }
      return {
        ...prev,
        connections: newConnections,
        lastActivity: Date.now(),
        messageCount: prev.messageCount + 1
      }
    })

    addEvent({
      type: 'message',
      clientId: fromClientId,
      data,
      message: `Message from ${client.name}`
    })

    // Simulate packet from client to DO
    addPacket(fromClientId, 'durable-object', data)

    // Broadcast to all other clients
    setTimeout(() => {
      state.connections.forEach((otherClient) => {
        if (otherClient.id !== fromClientId && otherClient.status === 'connected') {
          addPacket('durable-object', otherClient.id, data)
        }
      })
    }, 100)

    resetHibernationTimer()
  }, [state.connections, addEvent, addPacket, resetHibernationTimer])

  const broadcastMessage = useCallback((data: any) => {
    setState(prev => ({
      ...prev,
      lastActivity: Date.now(),
      messageCount: prev.messageCount + 1
    }))

    addEvent({
      type: 'message',
      message: 'Broadcasting to all clients'
    })

    state.connections.forEach((client) => {
      if (client.status === 'connected') {
        addPacket('durable-object', client.id, data)
      }
    })

    resetHibernationTimer()
  }, [state.connections, addEvent, addPacket, resetHibernationTimer])

  const reset = useCallback(() => {
    setState({
      connections: new Map(),
      isHibernating: false,
      lastActivity: Date.now(),
      messageCount: 0
    })
    setEvents([])
    setPackets([])
    clientCounterRef.current = 0
    if (hibernationTimerRef.current) {
      clearTimeout(hibernationTimerRef.current)
    }
  }, [])

  useEffect(() => {
    resetHibernationTimer()
    return () => {
      if (hibernationTimerRef.current) {
        clearTimeout(hibernationTimerRef.current)
      }
    }
  }, [resetHibernationTimer])

  return {
    state,
    events,
    packets,
    clients: Array.from(state.connections.values()),
    addClient,
    removeClient,
    sendMessage,
    broadcastMessage,
    reset,
    stats: {
      connectionCount: state.connections.size,
      messageCount: state.messageCount,
      isHibernating: state.isHibernating,
      lastActivity: state.lastActivity
    }
  }
}
