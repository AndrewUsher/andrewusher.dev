---
date: 2026-01-21
isPublished: true
slug: promise-all-vs-promise-allsettled
tags: ['javascript', 'async', 'promises']
title: 'Handling Multiple Promises: Promise.all vs Promise.allSettled'
---

When you're pulling data from multiple sources at once, JavaScript gives you two tools: `Promise.all` and `Promise.allSettled`. Pick the wrong one and things get ugly fast—one failed request takes down everything.

I'll break down when to use each.

## Promise.all: Everything or Nothing

`Promise.all` stops dead the moment anything fails. If you're fetching three endpoints and one returns a 500 error, you get nothing back. Zilch.

```javascript
const fetchUserData = async () => {
  const endpoints = [
    'https://api.example.com/users/1',
    'https://api.example.com/users/2',
    'https://api.example.com/users/3',
  ]

  try {
    const responses = await Promise.all(
      endpoints.map((url) => fetch(url).then((res) => res.json()))
    )
    console.log('All data fetched:', responses)
    return responses
  } catch (error) {
    console.error('One request failed:', error)
  }
}
```

This makes sense when your operations depend on each other. Picture a form submission where validations chain together, or a dashboard where missing user data means you can't render anything at all. If one piece missing breaks the whole flow, `Promise.all` is your friend.

## Promise.allSettled: Let Everything Finish

`allSettled` doesn't care about failure—it waits for all promises to finish and reports back on each one individually.

```javascript
const fetchUserProfiles = async () => {
  const requests = [
    fetch('/api/user/1'),
    fetch('/api/user/2'),
    fetch('/api/avatar/3'),
  ]

  const results = await Promise.allSettled(requests)

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index} succeeded:`, result.value)
    } else {
      console.log(`Request ${index} failed:`, result.reason)
    }
  })

  return results
}
```

Each result tells you whether it succeeded (`status: "fulfilled"`) or failed (`status: "rejected"`). This is perfect for independent operations where partial data still has value.

## When to Use Which

Go with `Promise.all` when partial results are useless. If you're loading critical data and can't proceed without all of it, this is the right call.

Go with `Promise.allSettled` when operations are independent and some data beats no data. Analytics, optional metadata, secondary UI elements—these don't need to bring down the whole page if one source is down.

Ask yourself: "If half these requests fail, is the result still useful?" Answer no? `Promise.all`. Answer yes? `allSettled`.

## Quick Win: Extract Just the Successes

After `allSettled`, you often want the working values only:

```javascript
const results = await Promise.allSettled(promises)

const successfulValues = results
  .filter((result) => result.status === 'fulfilled')
  .map((result) => result.value)

const errors = results
  .filter((result) => result.status === 'rejected')
  .map((result) => result.reason)
```

Clean data, full error picture, zero surprises.

## The Bottom Line

`Promise.all` is all-or-nothing. `Promise.allSettled` plays the long game. The right choice keeps your app running when things go wrong—which they always do.
