export function buildFrontmatter(meta: {
  title?: string
  description?: string
}): string {
  const parts: string[] = ['---']
  if (meta.title) parts.push(`title: ${JSON.stringify(meta.title)}`)
  if (meta.description) parts.push(`description: ${JSON.stringify(meta.description)}`)
  parts.push('---')
  return parts.join('\n')
}
