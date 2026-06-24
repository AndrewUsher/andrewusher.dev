export function extractMeta(html: string) {
  const titleMatch = html.match(
    /<meta\s+name="title"\s+content="([^"]*)"|<meta\s+property="og:title"\s+content="([^"]*)"|<title>([^<]*)<\/title>/i,
  )
  const descMatch = html.match(
    /<meta\s+name="description"\s+content="([^"]*)"|<meta\s+property="og:description"\s+content="([^"]*)"/i,
  )
  const title = titleMatch?.[1] || titleMatch?.[2] || titleMatch?.[3]
  const description = descMatch?.[1] || descMatch?.[2]
  return { title, description } as { title?: string; description?: string }
}
