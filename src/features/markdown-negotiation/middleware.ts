import { extractMeta } from './extract-meta'
import { buildFrontmatter } from './build-frontmatter'
import { turndownService } from './convert'

export interface MarkdownNegotiationInput {
  pathname: string
  accept: string
  response: Response
}

export async function handleMarkdownNegotiation({
  pathname,
  accept,
  response: original,
}: MarkdownNegotiationInput): Promise<Response | null> {
  if (!accept.includes('text/markdown')) {
    return null
  }

  if (
    pathname.startsWith('/api/') ||
    !original.headers.get('content-type')?.includes('text/html') ||
    !original.body
  ) {
    return null
  }

  try {
    const cloned = original.clone()
    const html = await cloned.text()
    const meta = extractMeta(html)
    const frontmatter = buildFrontmatter(meta)
    const body = turndownService.turndown(html)
    const markdown = `${frontmatter}\n\n${body}`
    const tokens = Math.round(markdown.length / 4)

    const newHeaders = new Headers(original.headers)

    const existingVary = newHeaders.get('vary')
    newHeaders.set('vary', existingVary ? `${existingVary}, accept` : 'accept')

    newHeaders.set('content-type', 'text/markdown; charset=utf-8')
    newHeaders.set('x-markdown-tokens', String(tokens))
    newHeaders.delete('content-length')
    newHeaders.delete('content-encoding')

    return new Response(markdown, {
      status: original.status,
      statusText: original.statusText,
      headers: newHeaders,
    })
  } catch (error) {
    console.error('Markdown conversion failed:', error)
    return null
  }
}
