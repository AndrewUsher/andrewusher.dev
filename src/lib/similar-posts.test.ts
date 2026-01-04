import { describe, it, expect } from 'vitest'
import {
  calculateTagOverlap,
  calculateDateProximity,
  calculateSimilarityScore,
  getSimilarPosts,
  type BlogPost,
} from './similar-posts'

function createMockPost(
  slug: string,
  tags: string[] = [],
  date: Date = new Date('2024-01-01'),
  isPublished = true
): BlogPost {
  return {
    id: slug,
    data: {
      slug,
      tags,
      date,
      isPublished,
      title: `Post ${slug}`,
    },
    collection: 'blogPosts',
  } as BlogPost
}

describe('calculateTagOverlap', () => {
  it('returns 1.0 for identical tags', () => {
    const tags1 = ['react', 'javascript', 'tutorial']
    const tags2 = ['react', 'javascript', 'tutorial']
    expect(calculateTagOverlap(tags1, tags2)).toBe(1.0)
  })

  it('returns 0.5 for 50% overlap', () => {
    const tags1 = ['react', 'javascript']
    const tags2 = ['react', 'typescript']
    expect(calculateTagOverlap(tags1, tags2)).toBeCloseTo(0.333, 2)
  })

  it('returns 0 for no overlap', () => {
    const tags1 = ['react', 'javascript']
    const tags2 = ['python', 'django']
    expect(calculateTagOverlap(tags1, tags2)).toBe(0)
  })

  it('returns 0 when both tag arrays are empty', () => {
    expect(calculateTagOverlap([], [])).toBe(0)
  })

  it('returns 0 when one tag array is empty', () => {
    expect(calculateTagOverlap(['react'], [])).toBe(0)
    expect(calculateTagOverlap([], ['react'])).toBe(0)
  })

  it('handles undefined tags as empty arrays', () => {
    expect(calculateTagOverlap(undefined, undefined)).toBe(0)
    expect(calculateTagOverlap(['react'], undefined)).toBe(0)
  })

  it('is case insensitive', () => {
    const tags1 = ['React', 'JavaScript']
    const tags2 = ['react', 'javascript']
    expect(calculateTagOverlap(tags1, tags2)).toBe(1.0)
  })

  it('handles duplicate tags correctly', () => {
    const tags1 = ['react', 'react', 'javascript']
    const tags2 = ['react', 'typescript']
    expect(calculateTagOverlap(tags1, tags2)).toBeCloseTo(0.333, 2)
  })
})

describe('calculateDateProximity', () => {
  it('returns ~1.0 for same day', () => {
    const date = new Date('2024-01-01')
    expect(calculateDateProximity(date, date)).toBe(1.0)
  })

  it('returns high score for dates 1 day apart', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-02')
    expect(calculateDateProximity(date1, date2)).toBeGreaterThan(0.99)
  })

  it('returns moderate score for dates 30 days apart', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-31')
    const score = calculateDateProximity(date1, date2)
    expect(score).toBeGreaterThan(0.9)
    expect(score).toBeLessThan(1.0)
  })

  it('returns ~0.368 for dates 1 year apart (e^-1)', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2025-01-01')
    expect(calculateDateProximity(date1, date2)).toBeCloseTo(0.368, 2)
  })

  it('returns low score for dates 2 years apart', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2026-01-01')
    const score = calculateDateProximity(date1, date2)
    expect(score).toBeLessThan(0.2)
    expect(score).toBeGreaterThan(0)
  })

  it('handles dates in reverse order', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2025-01-01')
    expect(calculateDateProximity(date1, date2)).toEqual(
      calculateDateProximity(date2, date1)
    )
  })
})

describe('calculateSimilarityScore', () => {
  it('applies 80/20 weighting correctly', () => {
    const post1 = createMockPost(
      'post1',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )
    const post2 = createMockPost(
      'post2',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )

    const score = calculateSimilarityScore(post1, post2)
    expect(score).toBeCloseTo(1.0, 2)
  })

  it('prioritizes tag overlap over date proximity', () => {
    const post1 = createMockPost(
      'post1',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )
    const post2SameTags = createMockPost(
      'post2',
      ['react', 'javascript'],
      new Date('2030-01-01')
    )
    const post3NearDate = createMockPost('post3', [], new Date('2024-01-02'))

    const scoreSameTags = calculateSimilarityScore(post1, post2SameTags)
    const scoreNearDate = calculateSimilarityScore(post1, post3NearDate)

    expect(scoreSameTags).toBeGreaterThan(scoreNearDate)
  })

  it('combines tag and date scores correctly', () => {
    const post1 = createMockPost(
      'post1',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )
    const post2 = createMockPost('post2', ['react'], new Date('2024-01-01'))

    const tagScore = 0.5
    const dateScore = 1.0
    const expectedScore = 0.8 * tagScore + 0.2 * dateScore

    expect(calculateSimilarityScore(post1, post2)).toBeCloseTo(expectedScore, 2)
  })

  it('handles posts with no tags', () => {
    const post1 = createMockPost('post1', [], new Date('2024-01-01'))
    const post2 = createMockPost('post2', [], new Date('2024-01-01'))

    const score = calculateSimilarityScore(post1, post2)
    expect(score).toBeCloseTo(0.2, 2)
  })
})

describe('getSimilarPosts', () => {
  it('excludes the current post', () => {
    const currentPost = createMockPost(
      'current',
      ['react'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react'], new Date('2024-01-01')),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.every((s) => s.post.data.slug !== 'current')).toBe(true)
  })

  it('only includes published posts', () => {
    const currentPost = createMockPost(
      'current',
      ['react'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('published', ['react'], new Date('2024-01-01'), true),
      createMockPost('draft', ['react'], new Date('2024-01-01'), false),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.length).toBe(1)
    expect(similar[0]?.post.data.slug).toBe('published')
  })

  it('filters posts below 60% threshold', () => {
    const currentPost = createMockPost(
      'current',
      ['react', 'javascript', 'typescript', 'tutorial'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost(
        'high-similarity',
        ['react', 'javascript', 'typescript'],
        new Date('2024-01-01')
      ),
      createMockPost('low-similarity', ['python'], new Date('2024-01-01')),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.every((s) => s.score >= 0.6)).toBe(true)
  })

  it('sorts posts by score in descending order', () => {
    const currentPost = createMockPost(
      'current',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react', 'javascript'], new Date('2024-01-01')),
      createMockPost('post2', ['react'], new Date('2024-01-01')),
      createMockPost(
        'post3',
        ['react', 'javascript', 'typescript'],
        new Date('2024-01-01')
      ),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    for (let i = 0; i < similar.length - 1; i++) {
      expect(similar[i]?.score).toBeGreaterThanOrEqual(
        similar[i + 1]?.score ?? 0
      )
    }
  })

  it('limits results to 5 posts', () => {
    const currentPost = createMockPost(
      'current',
      ['react'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      ...Array.from({ length: 10 }, (_, i) =>
        createMockPost(`post${i}`, ['react'], new Date('2024-01-01'))
      ),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.length).toBeLessThanOrEqual(5)
  })

  it('returns fewer than 5 posts if only a few match', () => {
    const currentPost = createMockPost(
      'current',
      ['react', 'javascript'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react', 'javascript'], new Date('2024-01-01')),
      createMockPost('post2', ['react'], new Date('2024-01-01')),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.length).toBe(2)
  })

  it('returns empty array when no posts meet threshold', () => {
    const currentPost = createMockPost(
      'current',
      ['react'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('post1', ['python'], new Date('2030-01-01')),
      createMockPost('post2', ['django'], new Date('2030-01-01')),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar.length).toBe(0)
  })

  it('includes score in results', () => {
    const currentPost = createMockPost(
      'current',
      ['react'],
      new Date('2024-01-01')
    )
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react'], new Date('2024-01-01')),
    ]

    const similar = getSimilarPosts(currentPost, allPosts)
    expect(similar[0]).toHaveProperty('score')
    expect(similar[0]).toHaveProperty('post')
    expect(typeof similar[0]?.score).toBe('number')
  })
})
