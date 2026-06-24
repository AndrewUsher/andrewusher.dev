export function buildFrontmatter(meta: {
  title?: string
  description?: string
}): string {
  const parts: string[] = ['---']
  if (meta.title) parts.push(`title: ${meta.title}`)
  if (meta.description) parts.push(`description: ${meta.description}`)
  parts.push('---')
  return parts.join('\n')
}
