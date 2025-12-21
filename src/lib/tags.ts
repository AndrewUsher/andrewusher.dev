import { getCollection } from 'astro:content'
import { TAG_COLORS, getTagColor } from './tagColors'

export { TAG_COLORS, getTagColor }

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
