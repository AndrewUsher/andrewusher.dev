import { expect, test } from 'vitest'
import { renderAnswer } from './render-answer'
import type { ChatSource } from './types'

const sources: ChatSource[] = [{ number: 1, title: 'Cookies', heading: 'Reading', url: '/blog/cookies#reading', excerpt: 'Read cookies.' }]

test('links only valid source numbers and strips model-controlled links, images, and raw HTML', async () => {
  const html = await renderAnswer('Read cookies [1] [99]. [Bad](javascript:alert(1))\n\n<img src=x onerror=alert(1)>\n\n![Image](https://evil.example/tracker)', sources)
  expect(html).toContain('href="/blog/cookies#reading"')
  expect(html).not.toMatch(/javascript:|onerror|<img|evil\.example|\[99\]/)
})

test('escapes code and renders the same five Shiki theme variables as blog posts', async () => {
  const html = await renderAnswer('```js\nconst example = "<script>"\n```', sources)
  expect(html).toContain('astro-code')
  for (const theme of ['github-dark', 'github-light', 'dracula', 'monokai', 'nord']) expect(html).toContain(`--shiki-${theme}`)
  expect(html).not.toContain('<script>')
})
