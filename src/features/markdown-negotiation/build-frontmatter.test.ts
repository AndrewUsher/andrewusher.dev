import { describe, test, expect } from 'vitest'
import { buildFrontmatter } from './build-frontmatter'

describe('buildFrontmatter', () => {
  test('builds frontmatter with title only', () => {
    expect(buildFrontmatter({ title: 'My Page' })).toBe('---\ntitle: My Page\n---')
  })

  test('builds frontmatter with description only', () => {
    expect(buildFrontmatter({ description: 'A page description' })).toBe(
      '---\ndescription: A page description\n---',
    )
  })

  test('builds frontmatter with both title and description', () => {
    const result = buildFrontmatter({
      title: 'My Page',
      description: 'A page description',
    })
    expect(result).toBe('---\ntitle: My Page\ndescription: A page description\n---')
  })

  test('returns empty frontmatter block when no meta provided', () => {
    expect(buildFrontmatter({})).toBe('---\n---')
  })

  test('returns empty frontmatter block when title and description are undefined', () => {
    expect(buildFrontmatter({ title: undefined, description: undefined })).toBe(
      '---\n---',
    )
  })

  test('preserves special characters in title', () => {
    const result = buildFrontmatter({ title: 'Hello & Welcome | My Site' })
    expect(result).toContain('title: Hello & Welcome | My Site')
  })

  test('preserves multi-word description without wrapping', () => {
    const result = buildFrontmatter({ description: 'A page with many words' })
    expect(result).toContain('description: A page with many words')
  })
})
