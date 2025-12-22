import { useCallback, useEffect, useState } from 'react'

export interface RecentlyViewedPost {
  slug: string
  title: string
  date: string
  viewedAt: number
  readingTime?: string
  tags?: string[]
}

const STORAGE_KEY = 'recently-viewed-posts'
const MAX_POSTS = 5

export function useRecentlyViewed() {
  const [posts, setPosts] = useState<RecentlyViewedPost[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as RecentlyViewedPost[]
        setPosts(parsed)
      } catch {
        setPosts([])
      }
    }
  }, [])

  const addPost = useCallback((post: Omit<RecentlyViewedPost, 'viewedAt'>) => {
    const newPost: RecentlyViewedPost = {
      ...post,
      viewedAt: Date.now(),
    }

    setPosts((current) => {
      const filtered = current.filter((p) => p.slug !== post.slug)
      const updated = [newPost, ...filtered].slice(0, MAX_POSTS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getRecentPosts = (excludeSlug?: string) => {
    if (excludeSlug) {
      return posts.filter((p) => p.slug !== excludeSlug)
    }
    return posts
  }

  const clearHistory = () => {
    setPosts([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    posts,
    addPost,
    getRecentPosts,
    clearHistory,
  }
}
