import type { APIRoute } from 'astro'
import { createClient } from 'redis'
import { getCommitCalendar } from 'src/lib/github-commits'

export const prerender = false

const CACHE_TTL_SECONDS = 1800
const CACHE_CONTROL = 'public, s-maxage=1800, stale-while-revalidate=30'
let redisClient: ReturnType<typeof createClient> | null = null

async function readCachedCalendar(key: string): Promise<string | null> {
  const url = import.meta.env.REDIS_URL || process.env.REDIS_URL
  if (!url) return null

  try {
    redisClient ??= createClient({ url })
    if (!redisClient.isOpen) await redisClient.connect()
    return await redisClient.get(key)
  } catch (error) {
    console.error('Unable to read commit calendar cache:', error)
    return null
  }
}

async function cacheCalendar(key: string, value: string): Promise<void> {
  if (!redisClient?.isOpen) return

  try {
    await redisClient.set(key, value, { EX: CACHE_TTL_SECONDS })
  } catch (error) {
    console.error('Unable to write commit calendar cache:', error)
  }
}

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get('username')
  if (!username || !/^[a-z\d-]{1,39}$/i.test(username)) {
    return new Response(
      JSON.stringify({ error: 'A valid username is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const cacheKey = `commits:calendar:${username}:v1`
  const cached = await readCachedCalendar(cacheKey)
  if (cached) {
    return new Response(cached, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': CACHE_CONTROL,
      },
    })
  }

  try {
    const calendar = await getCommitCalendar(username)
    const body = JSON.stringify(calendar)
    await cacheCalendar(cacheKey, body)

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': CACHE_CONTROL,
      },
    })
  } catch (error) {
    console.error('Unable to fetch commit calendar:', error)
    return new Response(
      JSON.stringify({ error: 'Commit calendar unavailable', fallback: true }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
