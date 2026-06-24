import type { APIRoute } from 'astro'

const siteUrl = import.meta.env.SITE || 'https://andrewusher.dev'

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /

Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${siteUrl}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
