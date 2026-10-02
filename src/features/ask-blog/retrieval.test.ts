import { expect, test } from 'vitest'
import { retrieveChunks, toSources } from './retrieval'
import type { BlogChunk } from './types'

const chunks: BlogChunk[] = [
  { id: 'cookie', title: 'Cookies', heading: 'Reading cookies', url: '/blog/cookies#reading', text: 'Use cookieStore.get to read a cookie asynchronously.', embedding: [1, 0] },
  { id: 'deps', title: 'Dependencies', heading: 'Automation', url: '/blog/dependencies#automation', text: 'Renovate opens pull requests for dependency updates.', embedding: [0, 1] },
]

test('combines keyword and semantic evidence and keeps citations tied to original chunks', () => {
  const results = retrieveChunks(chunks, 'How do I manage dependency updates?', [0, 1])
  expect(results[0]?.id).toBe('deps')
  expect(toSources(results)[0]).toMatchObject({ number: 1, url: '/blog/dependencies#automation', heading: 'Automation' })
})

test('retrieves a paraphrase with no shared keywords using its embedding', () => {
  expect(retrieveChunks(chunks, 'Browser state persistence', [1, 0])[0]?.id).toBe('cookie')
})

test('returns no sources when neither lexical nor semantic evidence supports a question', () => {
  expect(retrieveChunks(chunks, 'Who won the football championship?', [-1, 0])).toEqual([])
})

test('falls back to keyword retrieval when local inference is unavailable', () => {
  expect(retrieveChunks(chunks, 'Renovate dependency updates')[0]?.id).toBe('deps')
})
