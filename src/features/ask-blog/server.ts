import { createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createClient } from 'redis'
import { EMBEDDING_MODEL, INDEX_FILE, INDEX_VERSION, MAX_HISTORY_MESSAGES, MAX_QUESTION_LENGTH, MODEL_REVISION } from './config'
import type { BlogIndex, ChatMessage } from './types'

export function chatEnabled(): boolean {
  return (process.env.ASK_BLOG_ENABLED ?? import.meta.env.ASK_BLOG_ENABLED) === 'true'
}

export function serverEnv(name: string): string | undefined {
  return process.env[name] ?? import.meta.env[name]
}

let indexPromise: Promise<BlogIndex> | undefined
export function loadIndex(): Promise<BlogIndex> {
  indexPromise ??= readFile(INDEX_FILE, 'utf8').then(text => {
    const index = JSON.parse(text) as BlogIndex
    if (index.version !== INDEX_VERSION || index.model !== EMBEDDING_MODEL || index.revision !== MODEL_REVISION) throw new Error('Embedding index incompatible')
    return index
  }).catch(error => { indexPromise = undefined; throw error })
  return indexPromise
}

function createRateRedis(url: string) {
  return createClient({ url, socket: { connectTimeout: 3_000, reconnectStrategy: false } })
}

let redisPromise: Promise<ReturnType<typeof createRateRedis>> | undefined
async function getRedis() {
  const url = serverEnv('REDIS_URL')
  if (!url) throw new Error('Rate limiting unavailable')
  redisPromise ??= (async () => {
    const client = createRateRedis(url)
    client.on('error', () => { redisPromise = undefined })
    await client.connect()
    return client
  })().catch(error => { redisPromise = undefined; throw error })
  return redisPromise!
}

export async function checkRateLimit(address: string): Promise<boolean> {
  const secret = serverEnv('ASK_BLOG_RATE_LIMIT_SALT') || serverEnv('REDIS_URL')
  if (!secret) throw new Error('Rate limiting unavailable')
  const hash = createHmac('sha256', secret).update(address).digest('hex')
  const redis = await getRedis()
  const count = await redis.eval(`local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 3600) end; return n`, {
    keys: [`ask-blog:rate:${hash}`], arguments: [],
  })
  return Number(count) <= 10
}

export function validateMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_HISTORY_MESSAGES + 1) return null
  const messages: ChatMessage[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object' || !('role' in item) || !('content' in item)) return null
    if (item.role !== 'user' && item.role !== 'assistant') return null
    if (typeof item.content !== 'string' || !item.content.trim() || item.content.length > (item.role === 'user' ? MAX_QUESTION_LENGTH : 4_000)) return null
    messages.push({ role: item.role, content: item.content.trim() })
  }
  if (messages[messages.length - 1]?.role !== 'user') return null
  return messages
}

export async function readRequestBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error('Empty body')
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let text = ''
  let bytes = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > 24_000) throw new Error('Body too large')
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
    return JSON.parse(text)
  } finally {
    await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}
