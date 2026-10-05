import { describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { GET } from './calendar'
import { server } from '../../../test/mocks/server'

describe('GET /api/commits/calendar', () => {
  test('returns calendar data with shared cache headers', async () => {
    const response = await GET({
      url: new URL('http://localhost/api/commits/calendar?username=TestUser'),
    } as Parameters<typeof GET>[0])
    const calendar = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=1800, stale-while-revalidate=30'
    )
    expect(calendar.total).toBe(10)
    expect(calendar.days[calendar.range.start]).toBe(0)
  })

  test('returns the list-only fallback when GitHub rate limits the request', async () => {
    server.use(
      http.get('https://api.github.com/users/:username/events/public', () => {
        return HttpResponse.json(
          { message: 'API rate limit exceeded' },
          { status: 403 }
        )
      })
    )

    const response = await GET({
      url: new URL('http://localhost/api/commits/calendar?username=TestUser'),
    } as Parameters<typeof GET>[0])
    const result = await response.json()

    expect(response.status).toBe(503)
    expect(result.fallback).toBe(true)
  })
})
