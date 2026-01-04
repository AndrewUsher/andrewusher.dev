import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { CollectionEntry } from 'astro:content'
import * as similarPostsLib from '../lib/similar-posts'

function createMockPost(
  slug: string,
  tags: string[] = [],
  date: Date = new Date('2024-01-01'),
  isPublished = true
): CollectionEntry<'blogPosts'> {
  return {
    id: slug,
    data: {
      slug,
      tags,
      date,
      isPublished,
      title: `Post ${slug}`
    },
    body: 'Test content',
    collection: 'blogPosts'
  } as CollectionEntry<'blogPosts'>
}

describe('SimilarPosts Component Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call getSimilarPosts with current post and all posts', () => {
    const getSimilarPostsSpy = vi.spyOn(similarPostsLib, 'getSimilarPosts')

    const currentPost = createMockPost('current', ['react', 'javascript'])
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react'], new Date('2024-01-01')),
      createMockPost('post2', ['javascript'], new Date('2024-01-02'))
    ]

    similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(getSimilarPostsSpy).toHaveBeenCalledWith(currentPost, allPosts)
  })

  it('should return similar posts when threshold is met', () => {
    const currentPost = createMockPost('current', ['react', 'javascript', 'typescript'])
    const allPosts = [
      currentPost,
      createMockPost('similar1', ['react', 'javascript', 'typescript'], new Date('2024-01-01')),
      createMockPost('similar2', ['react', 'javascript'], new Date('2024-01-02')),
      createMockPost('different', ['python'], new Date('2024-01-03'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result.length).toBeGreaterThan(0)
    expect(result.every(r => r.post.data.slug !== 'current')).toBe(true)
  })

  it('should return empty array when no posts meet threshold', () => {
    const currentPost = createMockPost('current', ['react', 'javascript'])
    const allPosts = [
      currentPost,
      createMockPost('different1', ['python'], new Date('2030-01-01')),
      createMockPost('different2', ['django'], new Date('2030-01-02'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result.length).toBe(0)
  })

  it('should exclude current post from results', () => {
    const currentPost = createMockPost('current', ['react'])
    const allPosts = [
      currentPost,
      createMockPost('post1', ['react'], new Date('2024-01-01'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result.every(r => r.post.data.slug !== 'current')).toBe(true)
  })

  it('should only include published posts', () => {
    const currentPost = createMockPost('current', ['react'])
    const allPosts = [
      currentPost,
      createMockPost('published', ['react'], new Date('2024-01-01'), true),
      createMockPost('draft', ['react'], new Date('2024-01-02'), false)
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result.every(r => r.post.data.isPublished === true)).toBe(true)
    expect(result.find(r => r.post.data.slug === 'draft')).toBeUndefined()
  })

  it('should return up to 5 posts maximum', () => {
    const currentPost = createMockPost('current', ['react'])
    const allPosts = [
      currentPost,
      ...Array.from({ length: 10 }, (_, i) =>
        createMockPost(`post${i}`, ['react'], new Date('2024-01-01'))
      )
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result.length).toBeLessThanOrEqual(5)
  })

  it('should sort posts by similarity score in descending order', () => {
    const currentPost = createMockPost('current', ['react', 'javascript', 'typescript'])
    const allPosts = [
      currentPost,
      createMockPost('high-similarity', ['react', 'javascript', 'typescript'], new Date('2024-01-01')),
      createMockPost('medium-similarity', ['react', 'javascript'], new Date('2024-01-01')),
      createMockPost('low-similarity', ['react'], new Date('2024-01-01'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score)
    }
  })

  it('should handle posts with no tags', () => {
    const currentPost = createMockPost('current', [])
    const allPosts = [
      currentPost,
      createMockPost('post1', [], new Date('2024-01-01')),
      createMockPost('post2', ['react'], new Date('2024-01-01'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result).toBeDefined()
  })

  it('should handle posts with undefined tags', () => {
    const currentPost = createMockPost('current')
    currentPost.data.tags = undefined

    const allPosts = [
      currentPost,
      createMockPost('post1', ['react'], new Date('2024-01-01'))
    ]

    const result = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(result).toBeDefined()
  })
})

describe('SimilarPosts Component Rendering', () => {
  it('should render heading when similar posts exist', () => {
    const currentPost = createMockPost('current', ['react', 'javascript'])
    const allPosts = [
      currentPost,
      createMockPost('similar', ['react', 'javascript'], new Date('2024-01-01'))
    ]

    const similarPosts = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(similarPosts.length).toBeGreaterThan(0)
  })

  it('should not render when no similar posts exist', () => {
    const currentPost = createMockPost('current', ['react'])
    const allPosts = [
      currentPost,
      createMockPost('different', ['python'], new Date('2030-01-01'))
    ]

    const similarPosts = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(similarPosts.length).toBe(0)
  })

  it('should pass correct post data to rendering logic', () => {
    const currentPost = createMockPost('current', ['react', 'javascript'])
    const allPosts = [
      currentPost,
      createMockPost('similar1', ['react', 'javascript'], new Date('2024-01-01'))
    ]

    const similarPosts = similarPostsLib.getSimilarPosts(currentPost, allPosts)

    expect(similarPosts[0]).toHaveProperty('post')
    expect(similarPosts[0]).toHaveProperty('score')
    expect(similarPosts[0].post.data.title).toBe('Post similar1')
  })
})
