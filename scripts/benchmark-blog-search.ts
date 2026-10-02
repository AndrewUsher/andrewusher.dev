import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { performance } from 'node:perf_hooks'
import { INDEX_FILE } from '../src/features/ask-blog/config'
import { embedText } from '../src/features/ask-blog/embeddings'
import { retrieveChunks } from '../src/features/ask-blog/retrieval'
import type { BlogIndex } from '../src/features/ask-blog/types'

async function benchmark() {
  const index = JSON.parse(await readFile(INDEX_FILE, 'utf8')) as BlogIndex
  const cases = [
    { question: 'How do I replace document.cookie?', post: 'cookie-store-api-the-modern-way-to-handle-cookies' },
    { question: 'Can updates to my packages happen automatically?', post: 'offloading-dependency-management-to-renovate' },
    { question: 'What is the difference between git stash and git commit?', post: 'difference-between-git-stash-and-git-commit' },
    { question: 'How do I make a browser read text aloud?', post: 'give-your-web-app-a-voice' },
  ]
  for (const [indexOfCase, entry] of cases.entries()) {
    const start = performance.now()
    const vector = await embedText(entry.question)
    const results = retrieveChunks(index.chunks, entry.question, vector)
    const time = Math.round(performance.now() - start)
    assert.ok(results.slice(0, 3).some(chunk => chunk.url.startsWith(`/blog/${entry.post}`)), `Expected source absent from top three: ${entry.question}`)
    console.info(`[ask-blog] ${indexOfCase === 0 ? 'Cold' : 'Warm'} query ${time}ms; top source ${results[0]?.url}`)
  }
  console.info(`[ask-blog] RSS ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MiB. Local measurements; verify Linux/Vercel separately.`)
}

benchmark().catch(error => { console.error(error); process.exitCode = 1 })
