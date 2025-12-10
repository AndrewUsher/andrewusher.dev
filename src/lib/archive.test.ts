import { describe, test, expect, vi, beforeEach } from 'vitest'
import {
  slugifyMonth,
  getMonthName,
  getMonthNumber,
  getYear,
  getArchiveData,
  getPostsByYear,
  getPostsByMonth,
} from './archive'

// Mock astro:content
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}))

import { getCollection } from 'astro:content'

describe('archive utilities - helper functions', () => {
  describe('slugifyMonth', () => {
    test('converts month name to lowercase', () => {
      expect(slugifyMonth('January')).toBe('january')
      expect(slugifyMonth('DECEMBER')).toBe('december')
    })

    test('trims whitespace', () => {
      expect(slugifyMonth(' January ')).toBe('january')
      expect(slugifyMonth('  December  ')).toBe('december')
    })
  })

  describe('getMonthName', () => {
    test('returns correct month name', () => {
      const jan = new Date('2025-01-15')
      const dec = new Date('2025-12-15')

      expect(getMonthName(jan)).toBe('January')
      expect(getMonthName(dec)).toBe('December')
    })
  })

  describe('getMonthNumber', () => {
    test('returns correct month number (1-indexed)', () => {
      const jan = new Date('2025-01-15')
      const dec = new Date('2025-12-15')

      expect(getMonthNumber(jan)).toBe(1)
      expect(getMonthNumber(dec)).toBe(12)
    })
  })

  describe('getYear', () => {
    test('returns correct year', () => {
      const date2025 = new Date('2025-06-15T12:00:00Z')
      const date2024 = new Date('2024-06-15T12:00:00Z')

      expect(getYear(date2025)).toBe(2025)
      expect(getYear(date2024)).toBe(2024)
    })
  })
})

describe('archive utilities - collection functions', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getArchiveData', () => {
    test('groups posts by year and month', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-01-15T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2024-06-20T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getArchiveData()

      expect(result).toHaveLength(2)
      expect(result[0]?.year).toBe(2025)
      expect(result[0]?.count).toBe(3)
      // 2025 has December (2 posts) and January (1 post)
      const monthNames = result[0]?.months.map(m => m.name)
      expect(monthNames).toContain('December')
      expect(monthNames).toContain('January')
      expect(result[1]?.year).toBe(2024)
      expect(result[1]?.count).toBe(1)
    })

    test('sorts years newest first', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2023-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2024-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getArchiveData()

      expect(result[0]?.year).toBe(2025)
      expect(result[1]?.year).toBe(2024)
      expect(result[2]?.year).toBe(2023)
    })

    test('sorts months within year newest first', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-06-01T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getArchiveData()

      expect(result[0]?.months[0]?.name).toBe('December')
      expect(result[0]?.months[1]?.name).toBe('June')
      expect(result[0]?.months[2]?.name).toBe('January')
    })

    test('filters unpublished posts in production', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-11-01T12:00:00Z'),
            isPublished: false,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      // Mock production environment
      const originalEnv = import.meta.env.DEV
      import.meta.env.DEV = false

      const result = await getArchiveData()

      // Should only have 1 post (the published one)
      expect(result[0]?.count).toBe(1)

      // Restore environment
      import.meta.env.DEV = originalEnv
    })

    test('counts posts correctly per month', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-15T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-30T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getArchiveData()

      expect(result[0]?.months[0]?.count).toBe(3)
      expect(result[0]?.months[0]?.name).toBe('December')
    })

    test('handles empty collection', async () => {
      vi.mocked(getCollection).mockResolvedValueOnce([])

      const result = await getArchiveData()

      expect(result).toHaveLength(0)
    })
  })

  describe('getPostsByYear', () => {
    test('filters posts by year', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2024-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-06-15T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByYear(2025)

      expect(result).toHaveLength(2)
      expect(result.every(post => getYear(post.data.date) === 2025)).toBe(true)
    })

    test('sorts posts newest first', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-01-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-31T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-06-15T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByYear(2025)

      expect(result).toHaveLength(3)
      expect(result[0]?.data.date.getMonth()).toBe(11) // December (0-indexed)
      expect(result[2]?.data.date.getMonth()).toBe(0) // January
    })

    test('returns empty array when no posts match', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByYear(2020)

      expect(result).toHaveLength(0)
    })
  })

  describe('getPostsByMonth', () => {
    test('filters posts by year and month', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-25T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-01-15T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2024-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByMonth(2025, 'december')

      expect(result).toHaveLength(2)
      expect(result.every(post => getYear(post.data.date) === 2025)).toBe(true)
      expect(
        result.every(
          post => getMonthName(post.data.date).toLowerCase() === 'december'
        )
      ).toBe(true)
    })

    test('sorts posts newest first', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-01T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-31T12:00:00Z'),
            isPublished: true,
          },
        },
        {
          data: {
            date: new Date('2025-12-15T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByMonth(2025, 'december')

      expect(result).toHaveLength(3)
      expect(result[0]?.data.date.getDate()).toBe(31)
      expect(result[2]?.data.date.getDate()).toBe(1)
    })

    test('returns empty array when no posts match', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const result = await getPostsByMonth(2025, 'january')

      expect(result).toHaveLength(0)
    })

    test('handles month slug case-insensitively', async () => {
      const mockPosts = [
        {
          data: {
            date: new Date('2025-12-08T12:00:00Z'),
            isPublished: true,
          },
        },
      ]

      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)

      const resultLower = await getPostsByMonth(2025, 'december')

      expect(resultLower).toHaveLength(1)

      // Reset mock for second call
      vi.mocked(getCollection).mockResolvedValueOnce(mockPosts as any)
      const resultUpper = await getPostsByMonth(2025, 'DECEMBER')

      expect(resultUpper).toHaveLength(1)
    })
  })
})
