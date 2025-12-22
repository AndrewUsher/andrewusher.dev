export type ConnectionType = 'websocket' | 'sse' | 'polling'

export type ConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'hibernating'
  | 'disconnected'
  | 'error'

export type EventType =
  | 'connect'
  | 'message'
  | 'disconnect'
  | 'hibernate'
  | 'resume'
  | 'error'

export interface Client {
  id: string
  name: string
  type: ConnectionType
  status: ConnectionStatus
  connectedAt: number
  lastActivity: number
}

export interface DurableObjectState {
  connections: Map<string, Client>
  isHibernating: boolean
  lastActivity: number
  messageCount: number
}

export interface StreamEvent {
  id: string
  type: EventType
  timestamp: number
  clientId?: string
  data?: any
  message?: string
}

export interface MetricData {
  cpu: number
  memory: number
  requests: number
  latency: number
  timestamp: number
}

export interface DataPacket {
  id: string
  from: string
  to: string
  data: any
  timestamp: number
}

export interface Position {
  x: number
  y: number
}

export interface AnimatedPacketProps {
  packet: DataPacket
  from: Position
  to: Position
  onComplete?: () => void
  duration?: number
}

export interface ConnectionNodeProps {
  id: string
  label: string
  status: ConnectionStatus
  position: Position
  onClick?: () => void
}

export interface EventTimelineProps {
  events: StreamEvent[]
  maxEvents?: number
  height?: number
}

export interface StreamBufferProps {
  items: any[]
  maxSize: number
  showBackpressure?: boolean
}
