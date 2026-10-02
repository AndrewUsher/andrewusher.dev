// OpenAI uses SSE; our endpoint uses newline-delimited JSON. Both parsers must
// tolerate UTF-8 and framing boundaries split across arbitrary network chunks.
export async function* readSseData(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      buffer += decoder.decode(value, { stream: !done })
      let boundary: RegExpExecArray | null
      while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
        const frame = buffer.slice(0, boundary.index)
        buffer = buffer.slice(boundary.index + boundary[0].length)
        const data = frame.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n')
        if (data) yield data
      }
      if (buffer.length > 100_000) throw new Error('Provider frame too large')
      if (done) break
    }
  } finally {
    await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}
