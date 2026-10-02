import type { APIContext } from 'astro'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { GET, POST } from '../../pages/api/ask-blog'
import { EMBEDDING_MODEL, INDEX_VERSION, MODEL_REVISION } from './config'
import { checkRateLimit, loadIndex } from './server'
import type { BlogIndex, ChatEvent } from './types'

vi.mock('./server', async importOriginal => ({
  ...await importOriginal<typeof import('./server')>(),
  checkRateLimit: vi.fn(), loadIndex: vi.fn(),
}))
vi.mock('./embeddings', () => ({ embedText: async () => [1, 0] }))

const index: BlogIndex = {
  version: INDEX_VERSION, model: EMBEDDING_MODEL, revision: MODEL_REVISION,
  chunks: [{ id: 'cookies', title: 'Cookies', heading: 'Reading', url: '/blog/cookies#reading', text: 'Use cookieStore.get to read cookies asynchronously.', embedding: [1, 0] }],
}

function context(messages: unknown = [{ role: 'user', content: 'Read cookies?' }], origin = 'https://example.com') {
  return {
    clientAddress: '192.0.2.1',
    request: new Request('https://example.com/api/ask-blog', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) }),
  } as APIContext
}

async function events(response: Response) {
  return (await response.text()).trim().split('\n').map(line => JSON.parse(line) as ChatEvent)
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('ASK_BLOG_ENABLED', 'true')
  vi.stubEnv('OPENAI_API_KEY', '')
  vi.mocked(checkRateLimit).mockResolvedValue(true)
  vi.mocked(loadIndex).mockResolvedValue(index)
})
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })

test('disables the API and availability endpoint without touching retrieval or the provider', async () => {
  vi.stubEnv('ASK_BLOG_ENABLED', 'false')
  expect((await POST(context())).status).toBe(404)
  expect(await (await GET(context())).json()).toEqual({ enabled: false })
  expect(checkRateLimit).not.toHaveBeenCalled()
  expect(loadIndex).not.toHaveBeenCalled()
})

test('rejects foreign origins and invalid questions before charging a rate-limit slot', async () => {
  expect((await POST(context(undefined, 'https://other.example'))).status).toBe(403)
  expect((await POST(context([{ role: 'user', content: 'x'.repeat(2_001) }]))).status).toBe(400)
  expect(checkRateLimit).not.toHaveBeenCalled()
})

test('enforces shared request limits and fails closed when Redis is unavailable', async () => {
  vi.mocked(checkRateLimit).mockResolvedValueOnce(false)
  const limited = await POST(context())
  expect(limited.status).toBe(429)
  expect(limited.headers.get('Retry-After')).toBe('3600')
  vi.mocked(checkRateLimit).mockRejectedValueOnce(new Error('Redis unavailable'))
  expect((await POST(context())).status).toBe(503)
  expect(loadIndex).not.toHaveBeenCalled()
})

test('provides source excerpts when generation is unavailable', async () => {
  const result = await events(await POST(context()))
  expect(result[0]).toMatchObject({ type: 'sources', sources: [{ url: '/blog/cookies#reading' }] })
  expect(result[1]).toMatchObject({ type: 'delta', text: expect.stringContaining('generation is unavailable') })
  expect(result[result.length - 1]?.type).toBe('done')
})

test('refuses unsupported questions without making a provider request', async () => {
  vi.mocked(loadIndex).mockResolvedValueOnce({ ...index, chunks: [] })
  vi.stubEnv('OPENAI_API_KEY', 'test-key')
  const fetch = vi.fn()
  vi.stubGlobal('fetch', fetch)
  const result = await events(await POST(context()))
  expect(result[1]).toMatchObject({ type: 'delta', text: expect.stringContaining('couldn’t find an answer') })
  expect(fetch).not.toHaveBeenCalled()
})

test('streams a grounded answer with bounded history and validated citation destinations', async () => {
  vi.stubEnv('OPENAI_API_KEY', 'test-key')
  const fetch = vi.fn().mockResolvedValue(new Response('data: {"choices":[{"delta":{"content":"Use cookieStore.get [1]."}}]}\n\ndata: [DONE]\n\n'))
  vi.stubGlobal('fetch', fetch)
  const result = await events(await POST(context([
    { role: 'user', content: 'How can I use cookies?' },
    { role: 'assistant', content: 'A previous answer with an invented link.' },
    { role: 'user', content: 'Show an example.' },
  ])))
  expect(result.find(event => event.type === 'delta')).toEqual({ type: 'delta', text: 'Use cookieStore.get [1].' })
  expect(result[result.length - 1]).toMatchObject({ type: 'done', html: expect.stringContaining('href="/blog/cookies#reading"') })
  const payload = JSON.parse(fetch.mock.calls[0]![1].body) as { max_tokens: number; messages: { content: string }[] }
  expect(payload.max_tokens).toBe(600)
  expect(payload.messages[payload.messages.length - 1]?.content).toContain('cookieStore.get')
  expect(payload.messages[0]?.content).toContain('Prior assistant messages are not evidence')
})

test('keeps excerpts and replaces partial answers on provider failures', async () => {
  vi.stubEnv('OPENAI_API_KEY', 'test-key')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 429 })))
  const result = await events(await POST(context()))
  expect(result[0]?.type).toBe('sources')
  expect(result.find(event => event.type === 'error')).toMatchObject({ message: expect.stringContaining('interrupted') })
  expect(result[result.length - 1]?.type).toBe('done')
})

test('does not finalize an incomplete provider stream or an answer without citations', async () => {
  vi.stubEnv('OPENAI_API_KEY', 'test-key')
  const fetch = vi.fn()
    .mockResolvedValueOnce(new Response('data: {"choices":[{"delta":{"content":"Partial answer [1]."}}]}\n\n'))
    .mockResolvedValueOnce(new Response('data: {"choices":[{"delta":{"content":"A claim with no source."}}]}\n\ndata: [DONE]\n\n'))
  vi.stubGlobal('fetch', fetch)
  for (let i = 0; i < 2; i++) {
    const result = await events(await POST(context()))
    expect(result.find(event => event.type === 'error')).toBeDefined()
    expect(result[result.length - 1]).toMatchObject({ type: 'done', html: expect.stringContaining('generation was interrupted') })
  }
})
