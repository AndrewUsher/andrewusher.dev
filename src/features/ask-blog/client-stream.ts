import type { ChatEvent } from './types'

export async function readChatStream(body: ReadableStream<Uint8Array>, onEvent: (event: ChatEvent) => void): Promise<void> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let finished = false
  try {
    while (true) {
      const { done, value } = await reader.read()
      buffer += decoder.decode(value, { stream: !done })
      let boundary: number
      while ((boundary = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 1)
        if (!line.trim()) continue
        const event = JSON.parse(line) as ChatEvent
        if (event.type === 'done') finished = true
        onEvent(event)
      }
      if (done) break
    }
    if (!finished) throw new Error('Response interrupted')
  } finally {
    await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}
