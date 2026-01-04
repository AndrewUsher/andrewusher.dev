import type { CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blogPosts'>

export interface SimilarPost {
  post: BlogPost
  score: number
}

const TAG_WEIGHT = 0.8
const DATE_WEIGHT = 0.2
const SIMILARITY_THRESHOLD = 0.4
const MAX_SIMILAR_POSTS = 5

export function calculateTagOverlap(
  tags1: string[] = [],
  tags2: string[] = []
): number {
  if (tags1.length === 0 && tags2.length === 0) {
    return 0
  }

  const set1 = new Set(tags1.map((tag) => tag.toLowerCase()))
  const set2 = new Set(tags2.map((tag) => tag.toLowerCase()))

  const intersection = new Set([...set1].filter((tag) => set2.has(tag)))
  const union = new Set([...set1, ...set2])

  if (union.size === 0) {
    return 0
  }

  return intersection.size / union.size
}

export function calculateDateProximity(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const daysDiff = Math.abs(date1.getTime() - date2.getTime()) / msPerDay

  const decayConstant = 365
  return Math.exp(-daysDiff / decayConstant)
}

export function calculateSimilarityScore(
  currentPost: BlogPost,
  candidatePost: BlogPost
): number {
  const tagScore = calculateTagOverlap(
    currentPost.data.tags,
    candidatePost.data.tags
  )

  const dateScore = calculateDateProximity(
    currentPost.data.date,
    candidatePost.data.date
  )

  return TAG_WEIGHT * tagScore + DATE_WEIGHT * dateScore
}

export function getSimilarPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[]
): SimilarPost[] {
  const scoredPosts = allPosts
    .filter(
      (post) =>
        post.data.slug !== currentPost.data.slug &&
        post.data.isPublished === true
    )
    .map((post) => ({
      post,
      score: calculateSimilarityScore(currentPost, post),
    }))
    .filter(({ score }) => score >= SIMILARITY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SIMILAR_POSTS)

  return scoredPosts
}
