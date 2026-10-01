import type { CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blogPosts'>

export function slugifySeries(series: string): string {
  return series
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
}

export function getSeriesPosts(
  series: string,
  posts: BlogPost[]
): BlogPost[] {
  return posts
    .filter((post) => post.data.series === series)
    .sort((a, b) => {
      const orderDifference =
        (a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER)

      return orderDifference || a.data.date.valueOf() - b.data.date.valueOf()
    })
}
