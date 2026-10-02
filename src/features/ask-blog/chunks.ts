import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import { toString } from 'mdast-util-to-string'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import type { RootContent } from 'mdast'

export interface BlogSection {
  title: string
  heading: string
  url: string
  text: string
}

function contentText(node: RootContent): string {
  // MDX imports/components and raw HTML are not article prose. In particular,
  // don't strip import statements inside fenced code with a source regex.
  if (node.type.startsWith('mdx') || node.type === 'html') return ''
  if (node.type === 'code') return `\`\`\`${node.lang || ''}\n${node.value}\n\`\`\``
  if ('children' in node) {
    return node.children.map(child => contentText(child as RootContent)).join(
      node.type === 'paragraph' || node.type === 'heading' ? '' : '\n'
    )
  }
  return toString(node)
}

export function extractSections(source: string, mdx = false): BlogSection[] {
  // Older posts have blank lines before frontmatter; Astro accepts these too.
  const { data, content } = matter(source.trimStart())
  if (data.isPublished !== true) return []
  if (typeof data.title !== 'string' || typeof data.slug !== 'string') {
    throw new Error('Published blog posts must have a title and slug')
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error('Invalid blog citation slug')
  const parser = unified().use(remarkParse)
  if (mdx) parser.use(remarkMdx)
  const tree = parser.parse(content)
  const slugger = new GithubSlugger()
  const postUrl = `/blog/${data.slug}`
  const sections: BlogSection[] = []
  const hierarchy: string[] = []
  let heading = 'Introduction'
  let url = postUrl
  let parts: string[] = []
  const flush = () => {
    const text = parts.join('\n\n').trim()
    if (text) sections.push({ title: data.title as string, heading, url, text })
    parts = []
  }
  for (const node of tree.children) {
    if (node.type === 'heading') {
      flush()
      const title = toString(node)
      hierarchy.length = node.depth - 1
      hierarchy[node.depth - 1] = title
      heading = hierarchy.filter(Boolean).join(' / ')
      // rehype-slug uses the same GithubSlugger, including duplicate headings.
      url = `${postUrl}#${slugger.slug(title)}`
    } else {
      const text = contentText(node)
      if (text) parts.push(text)
    }
  }
  flush()
  return sections
}

// Slice at original-text word boundaries: decoding WordPiece tokens would lose
// punctuation, capitalization, and formatting in code examples.
export function splitChunkText(
  text: string,
  tokenCount: (text: string) => number,
  budget = 200,
  overlap = 24
): string[] {
  const words = [...text.matchAll(/\S+/g)]
  const chunks: string[] = []
  let start = 0
  while (start < words.length) {
    const from = words[start]!.index
    let end = start
    while (end < words.length) {
      const candidate = text.slice(from, words[end]!.index + words[end]![0].length)
      if (tokenCount(candidate) > budget) break
      end++
    }
    if (end === start) {
      // An exceptionally long unbroken token (e.g. an encoded payload) is split
      // without silently truncating it at the model's input limit.
      let remaining = words[start]![0]
      while (remaining) {
        let length = Math.min(remaining.length, budget)
        while (length > 1 && tokenCount(remaining.slice(0, length)) > budget) length--
        chunks.push(remaining.slice(0, length))
        remaining = remaining.slice(length)
      }
      start++
      continue
    }
    chunks.push(text.slice(from, words[end - 1]!.index + words[end - 1]![0].length))
    if (end === words.length) break
    let next = end
    while (next > start + 1 && tokenCount(text.slice(words[next - 1]!.index, words[end]!.index)) <= overlap) next--
    start = next
  }
  return chunks
}
