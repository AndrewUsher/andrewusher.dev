---
date: 2026-02-03
isPublished: true
slug: promise-any-race-resilient-ui
tags: ['javascript', 'async', 'promises']
title: 'Beyond the Basics: Using Promise.any and Promise.race for Resilient UI'
---

You're building an analytics dashboard. User data from one endpoint, metrics from another, recent activity from a third. One API responds in 200ms. One takes three seconds. The third never responds at all. Your users stare at a loading spinner for eight seconds before the entire page crashes with an error.

Welcome to distributed systems. APIs fail. Networks hiccup. Services degrade. If you're using `Promise.all` for everything, one slow request tanks your entire UI. [I wrote about `Promise.all` vs `Promise.allSettled` before](/blog/promise-all-vs-promise-allsettled), but sometimes you need something faster than waiting for everything to finish.

That's where `Promise.any` and `Promise.race` come in.

## Promise.any: Redundancy as a Strategy

`Promise.any` just grabs the first successful result from an array of promises. If every single one fails, you get an `AggregateError` containing all the reasons why. Use this when you have redundant sources for the same data—you don't care which one wins, just that *one* does.

### Pattern 1: Dashboard Data with Fallback Sources

I often see dashboards that rely on a single primary service for, say, weather data. If that API slows down, the whole dashboard hangs. Here, we try two providers at once. If the primary API is up, we use it. If it's down, the backup should take over immediately.

```javascript
const fetchWeatherData = async (city) => {
  const primarySource = fetch(`https://api.weather-service-a.com/v1/current?city=${city}`)
    .then(res => {
      if (!res.ok) throw new Error('Primary service failed')
      return res.json()
    })

  const backupSource = fetch(`https://api.weather-service-b.com/current.json?q=${city}`)
    .then(res => {
      if (!res.ok) throw new Error('Backup service failed')
      return res.json()
    })

  try {
    const weather = await Promise.any([primarySource, backupSource])
    return weather
  } catch (error) {
    // AggregateError means both services failed
    console.error('All weather services unavailable:', error.errors)
    return { error: 'Weather data unavailable', cached: true }
  }
}
```

That `AggregateError` is important—it bundles up all the failures if they all strike out. Use this pattern for any critical data source that can be duplicated: images, user prefs, secondary geo-locations. If one source dies, the UI keeps functioning.

## Promise.race: Speed Over Completeness

`Promise.race` resolves as soon as the first promise settles—that includes rejections. I use this when *time* is the actual constraint, not redundancy.

### Pattern 2: Hard Timeouts for User Perception

Users hate waiting. Three seconds is pushing it; eight seconds means the app feels broken. `Promise.race` lets you set a hard deadline.

```javascript
const fetchWithTimeout = (url, timeoutMs = 5000) => {
  const fetchPromise = fetch(url).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  })

  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error(`Request timeout after ${timeoutMs}ms`)), timeoutMs)
  )

  return Promise.race([fetchPromise, timeoutPromise])
}

// Usage: We won't wait more than 3 seconds for metrics
const loadDashboardMetrics = async () => {
  try {
    return await fetchWithTimeout('/api/metrics', 3000)
  } catch (error) {
    if (error.message.includes('timeout')) {
      // The API was too slow, so we fall back to what we already have
      return getCachedMetrics()
    }
    throw error
  }
}
```

This is powerful. If the API rejects in 50ms, that rejection wins the race and we handle it. We don't sit around waiting for it to eventually succeed.

### Pattern 3: Fast Cache with Background Refresh

This is my favorite trick for making apps *feel* fast. If you have local cache data, show it instantly. Then, race that cached data against the network fetch.

```javascript
const getUserProfile = async (userId) => {
  const cacheKey = `user-${userId}`
  const cached = getFromCache(cacheKey)

  const networkRequest = fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      setCache(cacheKey, data)
      return data
    })
    .catch(() => null) // Fire-and-forget if network fails

  if (cached) {
    // The cache wins the race instantly. We fire off the network fetch 
    // just to update the cache for the next load.
    networkRequest
    return cached
  }

  // No cache? We race the network against a hard timeout.
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Network too slow')), 4000)
  )

  return Promise.race([networkRequest, timeoutPromise])
}
```

This pattern is how modern apps feel instant. The user sees data in 50 milliseconds from cache while the network request updates things in the background. If the network is faster than 4 seconds, they get fresh data. If not, they at least see something.

### Pattern 4: Retry with Exponential Backoff and Timeout Ceiling

Transient network failures happen. A request might fail at T+0 but succeed fine at T+1. We give flaky networks a second chance without hammering the server using exponential backoff.

We're keeping the implementation slightly complex because this needs to be production-ready.

```javascript
const fetchWithRetry = async (url, options = {}) => {
  const { maxRetries = 3, baseDelay = 500 } = options

  const attemptFetch = async (attempt = 0) => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      if (attempt >= maxRetries) throw error

      // Exponential backoff: 500ms, 1000ms, 2000ms
      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`Retry ${attempt + 1}/${maxRetries} after ${delay}ms`)

      await new Promise(resolve => setTimeout(resolve, delay))
      return attemptFetch(attempt + 1)
    }
  }

  return attemptFetch()
}

// Final resilience wrapper: retry with a hard timeout ceiling
const resilientFetch = (url) => {
  const fetchPromise = fetchWithRetry(url, { maxRetries: 3, baseDelay: 500 })
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timed out after all retries')), 10000)
  )

  return Promise.race([fetchPromise, timeoutPromise])
}
```

This wrapper function is the real win: we retry a few times, but if the whole process takes longer than 10 seconds, we bail out hard using `Promise.race`. Your users don't wait forever.

## When to Use Which: A Quick Decision Guide

Here is how all four promise methods fit together:

| Method | Use When | Failure Behavior | Returns |
|--------|----------|------------------|---------|
| `Promise.all` | You need ALL results to proceed | First rejection fails everything | Array of all values |
| `Promise.allSettled` | Operations are independent, partial data is useful | Never fails, reports all outcomes | Array of status/value objects |
| `Promise.any` | Redundancy; need one success | Fails only if *all* fail | First success |
| `Promise.race` | Speed is critical; need fastest response | Fails immediately on first rejection | First settled (success or error) |

**Simple decision tree:**
- Need all the data? Use `all`
- Is partial data okay? Use `allSettled`
- Need redundant sources? Use `any`
- Need to enforce a time limit? Use `race`

## Pitfalls to Avoid

I know I keep hammering this, but it's easy to confuse these for each other. Here are the traps I fall into most often.

**Pitfall 1: Using `race` when you meant `any`**

This is the most common mistake. If you try three redundant sources, and one fails instantly, `Promise.race` returns that error instantly. You wanted the first success, not the first thing to happen. For fallback/redundancy, stick with `Promise.any`. For time limits, use `Promise.race`.

**Pitfall 2: Memory Leaks from Abandoned Promises**

When `Promise.race` or `Promise.any` settles, the losers don't magically disappear. If you start five `fetch` calls and get the first result, four are still downloading in the background. This wastes bandwidth. Use `AbortController` to cancel those unwanted background requests when you get your result.

```javascript
// Quick cleanup snippet
const controller = new AbortController()
const fetchWithCleanup = (url) => fetch(url, { signal: controller.signal })
// When done: controller.abort()
```

**Pitfall 3: AggregateError Confusion**

Don't try to catch individual errors inside a `Promise.any` block unless you know all of them failed. If one fails, `any` keeps waiting for a success. If you need to know about every single success *and* failure immediately, stop messing around and just use `Promise.allSettled`.

## The Bottom Line

Resilient UIs are built by expecting failure. `Promise.any` gives you redundancy when sources fail. `Promise.race` gives you timeboxing when speed matters. Start by putting timeouts on your critical fetches. Then add fallbacks for your most important data. Your users won't notice the next outage.