import { expect, test } from 'vitest'
import { readSseData } from './stream'
import { readChatStream } from './client-stream'
import type { ChatEvent } from './types'

function fragmented(text: string) {
  const bytes = new TextEncoder().encode(text)
  return new ReadableStream<Uint8Array>({ start(controller) {
    // Split every UTF-8 code point and delimiter to exercise network framing.
    for (const byte of bytes) controller.enqueue(new Uint8Array([byte]))
    controller.close()
  } })
}

test('reads fragmented provider SSE with CRLF and multibyte text', async () => {
  const values = []
  for await (const value of readSseData(fragmented('data: {"text":"café"}\r\n\r\ndata: [DONE]\n\n'))) values.push(value)
  expect(values).toEqual(['{"text":"café"}', '[DONE]'])
})

test('reads fragmented chat events and detects unfinished responses', async () => {
  const events: ChatEvent[] = []
  await readChatStream(fragmented('{"type":"delta","text":"café"}\n{"type":"done","html":"<p>café</p>"}\n'), event => events.push(event))
  expect(events).toHaveLength(2)
  expect(events[0]).toEqual({ type: 'delta', text: 'café' })
  await expect(readChatStream(fragmented('{"type":"delta","text":"partial"}\n'), () => {})).rejects.toThrow('Response interrupted')
})
