import type { APIContext } from 'astro'
import { handleMarkdownNegotiation } from './features/markdown-negotiation'

export async function onRequest(
  context: APIContext,
  next: () => Promise<Response>,
): Promise<Response> {
  const response = await next()
  const canonicalHostname = new URL(
    import.meta.env.SITE || 'https://andrewusher.dev',
  ).hostname
  const isPreviewHost = context.url.hostname !== canonicalHostname
  const isDraftPath = /^\/(?:preview|draft)(?:\/|$)/i.test(context.url.pathname)

  if (isPreviewHost || isDraftPath) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  if (context.url.pathname === '/') {
    response.headers.set(
      'Link',
      '</rss.xml>; rel="alternate"; type="application/rss+xml", </sitemap.xml>; rel="sitemap"',
    )
  }

  const converted = await handleMarkdownNegotiation({
    pathname: context.url.pathname,
    accept: context.request.headers.get('accept') || '',
    response,
  })

  return converted ?? response
}
