import { Marked } from 'marked'
import { codeToHtml, bundledLanguages } from 'shiki'
import type { ChatSource } from './types'

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

export async function renderAnswer(text: string, sources: ChatSource[]): Promise<string> {
  const code = new Map<string, string>()
  const marked = new Marked()
  const tokens = marked.lexer(text)
  const jobs: Promise<void>[] = []
  marked.walkTokens(tokens, token => {
    if (token.type !== 'code') return
    const language = token.lang?.split(/\s/)[0] || 'text'
    jobs.push(codeToHtml(token.text, {
      lang: language in bundledLanguages ? language : 'text',
      themes: { 'github-dark': 'github-dark', 'github-light': 'github-light', dracula: 'dracula', monokai: 'monokai', nord: 'nord' },
      defaultColor: false,
    }).then(html => { code.set(token.text, html.replace('class="shiki ', 'class="astro-code ')) }))
  })
  await Promise.all(jobs)
  marked.use({ renderer: {
    html() { return '' },
    image(token) { return escapeHtml(token.text) },
    // The provider cannot introduce destinations. Only [n] references below
    // become links, and those destinations are owned by the build index.
    link(token) { return this.parser.parseInline(token.tokens) },
    codespan(token) { return `<code>${escapeHtml(token.text)}</code>` },
    code(token) { return code.get(token.text) ?? `<pre><code>${escapeHtml(token.text)}</code></pre>` },
    text(token) {
      if ('tokens' in token && token.tokens) return this.parser.parseInline(token.tokens)
      return escapeHtml(token.text).replace(/\[(\d+)\]/g, (_match, number: string) => {
        const source = sources.find(item => item.number === Number(number))
        return source ? `<a href="${escapeHtml(source.url)}" aria-label="Source ${source.number}: ${escapeHtml(source.title)}">[${source.number}]</a>` : ''
      })
    },
  } })
  return marked.parser(tokens)
}
