import type { APIContext } from 'astro'

export async function onRequest(context: APIContext, next: () => Promise<Response>): Promise<Response> {
  const response = await next()

  if (context.url.pathname === '/') {
    response.headers.set(
      'Link',
      '</rss.xml>; rel="alternate"; type="application/rss+xml", </sitemap.xml>; rel="sitemap"',
    )
  }

  return response
}
