import { describe, expect, it } from 'vitest'
import type { CollectionEntry } from 'astro:content'
import {
  getSeriesPosts,
  getUniqueSeriesSlugs,
  slugifySeries,
} from './series'

function createPost(
  slug: string,
  series: string,
  seriesOrder: number,
  date = new Date('2024-01-01')
): CollectionEntry<'blogPosts'> {
  return {
    id: slug,
    data: {
      slug,
      series,
      seriesOrder,
      date,
      isPublished: true,
      title: slug,
    },
    body: '',
    collection: 'blogPosts',
  } as CollectionEntry<'blogPosts'>
}

describe('blog series helpers', () => {
  it('creates URL-friendly series slugs', () => {
    expect(slugifySeries('  Modern Web APIs!  ')).toBe('modern-web-apis')
  })

  it('rejects different series names that resolve to the same route slug', () => {
    expect(() =>
      getUniqueSeriesSlugs(['Modern Web APIs', 'Modern Web APIs!'])
    ).toThrow(
      'Blog series route slug collision: "Modern Web APIs" and "Modern Web APIs!" both resolve to "modern-web-apis".'
    )
  })

  it('filters posts to a series and sorts them by series order', () => {
    const second = createPost('second', 'Modern Web APIs', 2)
    const first = createPost('first', 'Modern Web APIs', 1)
    const unrelated = createPost('unrelated', 'Another Series', 1)

    expect(getSeriesPosts('Modern Web APIs', [second, unrelated, first])).toEqual([
      first,
      second,
    ])
  })
})
