function extractContentFor(
  html: string,
  attr: string,
  value: string,
): string | undefined {
  const pattern = new RegExp(
    `<meta\\s+(?=[^>]*?\\b${attr}\\s*=\\s*["']${value}["'])[^>]*?\\bcontent\\s*=\\s*["']([^"']*)["'][^>]*?>`,
    'i',
  )
  return html.match(pattern)?.[1]
}

export function extractMeta(html: string) {
  const title =
    extractContentFor(html, 'name', 'title') ||
    extractContentFor(html, 'property', 'og:title') ||
    html.match(/<title>([^<]*)<\/title>/i)?.[1]

  const description =
    extractContentFor(html, 'name', 'description') ||
    extractContentFor(html, 'property', 'og:description')

  return { title, description } as { title?: string; description?: string }
}
