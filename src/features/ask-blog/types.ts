export interface BlogChunk {
  id: string
  title: string
  heading: string
  url: string
  text: string
  embedding: number[]
}

export interface BlogIndex {
  version: number
  model: string
  revision: string
  chunks: BlogChunk[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatSource {
  number: number
  title: string
  heading: string
  url: string
  excerpt: string
}

export type ChatEvent =
  | { type: 'sources'; sources: ChatSource[] }
  | { type: 'delta'; text: string }
  | { type: 'done'; html: string }
  | { type: 'error'; message: string }
