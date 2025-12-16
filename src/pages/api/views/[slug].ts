import type { APIRoute } from 'astro'
import { createClient } from 'redis'

export const prerender = false
const redis = await createClient({
  url: import.meta.env.REDIS_URL || process.env.REDIS_URL || '',
}).connect()

function getViewKey(slug: string): string {
  return `views:blog:${slug}`
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const viewKey = getViewKey(slug)
    const views = parseInt((await redis.get(viewKey)) ?? '0')

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    console.error('Error fetching views:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch views', views: 0 }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const viewKey = getViewKey(slug)
    const views = await redis.incr(viewKey)

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to increment views' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
