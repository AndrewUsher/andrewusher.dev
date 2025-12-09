import { getCollection } from 'astro:content'

export interface TagInfo {
  name: string
  slug: string
  count: number
}

export const slugifyTag = (tag: string): string => {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

export const getAllTags = async (): Promise<TagInfo[]> => {
  const allPosts = await getCollection('blogPosts')
  const publishedPosts = allPosts.filter(
    post => import.meta.env.DEV || post.data.isPublished
  )

  const tagCounts = new Map<string, number>()

  publishedPosts.forEach(post => {
    const tags = post.data.tags || []
    tags.forEach((tag: string) => {
      const slug = slugifyTag(tag)
      tagCounts.set(slug, (tagCounts.get(slug) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([slug, count]) => ({
      name: slug,
      slug,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const getPostsByTag = async (tagSlug: string) => {
  const allPosts = await getCollection('blogPosts')
  const publishedPosts = allPosts.filter(
    post => import.meta.env.DEV || post.data.isPublished
  )

  return publishedPosts
    .filter(post => {
      const tags = post.data.tags || []
      return tags.some((tag: string) => slugifyTag(tag) === tagSlug)
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export const TAG_COLORS: Record<string, string> = {
  react: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 hover:bg-blue-500/30',
  typescript:
    'bg-blue-600/20 text-blue-800 dark:text-blue-200 hover:bg-blue-600/30',
  javascript:
    'bg-yellow-500/20 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-500/30',
  astro:
    'bg-purple-500/20 text-purple-800 dark:text-purple-200 hover:bg-purple-500/30',
  tailwindcss:
    'bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/30',
  css: 'bg-pink-500/20 text-pink-800 dark:text-pink-200 hover:bg-pink-500/30',
  html: 'bg-orange-500/20 text-orange-800 dark:text-orange-200 hover:bg-orange-500/30',
  node: 'bg-green-600/20 text-green-800 dark:text-green-200 hover:bg-green-600/30',
  npm: 'bg-red-500/20 text-red-800 dark:text-red-200 hover:bg-red-500/30',
  git: 'bg-orange-600/20 text-orange-800 dark:text-orange-200 hover:bg-orange-600/30',
  github:
    'bg-slate-600/20 text-slate-800 dark:text-slate-200 hover:bg-slate-600/30',
  vscode:
    'bg-blue-700/20 text-blue-900 dark:text-blue-100 hover:bg-blue-700/30',
  testing:
    'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-500/30',
  vitest:
    'bg-lime-500/20 text-lime-800 dark:text-lime-200 hover:bg-lime-500/30',
  'web-development':
    'bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-500/30',
  performance:
    'bg-red-600/20 text-red-800 dark:text-red-200 hover:bg-red-600/30',
  tutorial:
    'bg-teal-500/20 text-teal-800 dark:text-teal-200 hover:bg-teal-500/30',
  guide: 'bg-sky-500/20 text-sky-800 dark:text-sky-200 hover:bg-sky-500/30',
  opinion:
    'bg-violet-500/20 text-violet-800 dark:text-violet-200 hover:bg-violet-500/30',
  career:
    'bg-rose-500/20 text-rose-800 dark:text-rose-200 hover:bg-rose-500/30',
  productivity:
    'bg-amber-500/20 text-amber-800 dark:text-amber-200 hover:bg-amber-500/30',
}

export const getTagColor = (tagSlug: string): string => {
  return (
    TAG_COLORS[tagSlug] ||
    'bg-slate-500/20 text-slate-800 dark:text-slate-200 hover:bg-slate-500/30'
  )
}
