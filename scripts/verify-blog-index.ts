import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { Window } from 'happy-dom'
import { INDEX_FILE } from '../src/features/ask-blog/config'
import type { BlogIndex } from '../src/features/ask-blog/types'

async function verify() {
  const index = JSON.parse(await readFile(INDEX_FILE, 'utf8')) as BlogIndex
  const expected: string[] = []
  for (const file of await readdir('content/blog')) {
    if (!/\.mdx?$/.test(file)) continue
    const { data } = matter((await readFile(join('content/blog', file), 'utf8')).trimStart())
    if (data.isPublished === true) expected.push(`/blog/${data.slug}`)
  }
  const actual = [...new Set(index.chunks.map(chunk => chunk.url.split('#')[0]!))]
  assert.deepEqual(actual.sort(), expected.sort(), 'Index must cover every published post and no drafts')
  const window = new Window()
  const document = window.document
  let citations = 0
  for (const url of expected) {
    document.body.innerHTML = await readFile(join('dist/client', url, 'index.html'), 'utf8')
    for (const chunk of index.chunks.filter(chunk => chunk.url.split('#')[0] === url)) {
      const anchor = chunk.url.split('#')[1]
      if (anchor) assert.ok(document.getElementById(decodeURIComponent(anchor)), `Missing citation heading: ${chunk.url}`)
      assert.equal(chunk.embedding.length, 384)
      assert.ok(chunk.embedding.every(Number.isFinite))
      citations++
    }
  }
  await window.happyDOM.close()
  console.info(`[ask-blog] Verified ${expected.length} published posts and ${citations} chunk citation targets.`)
}

verify().catch(error => { console.error(error); process.exitCode = 1 })
