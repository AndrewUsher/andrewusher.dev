import { describe, test, expect } from 'vitest'
import { buildFrontmatter } from './build-frontmatter'

describe('buildFrontmatter', () => {
  test('builds frontmatter with title only', () => {
    expect(buildFrontmatter({ title: 'My Page' })).toBe('---\ntitle: "My Page"\n---')
  })

  test('builds frontmatter with description only', () => {
    expect(buildFrontmatter({ description: 'A page description' })).toBe(
      '---\ndescription: "A page description"\n---',
    )
  })

  test('builds frontmatter with both title and description', () => {
    const result = buildFrontmatter({
      title: 'My Page',
      description: 'A page description',
    })
    expect(result).toBe('---\ntitle: "My Page"\ndescription: "A page description"\n---')
  })

  test('returns empty frontmatter block when no meta provided', () => {
    expect(buildFrontmatter({})).toBe('---\n---')
  })

  test('returns empty frontmatter block when title and description are absent', () => {
    expect(buildFrontmatter({})).toBe('---\n---')
  })

  test('escapes special YAML characters in title', () => {
    const result = buildFrontmatter({ title: 'Hello & Welcome | My Site' })
    expect(result).toContain('"Hello & Welcome | My Site"')
  })

  test('escapes multi-word description using JSON quoting', () => {
    const result = buildFrontmatter({ description: 'A page with many words' })
    expect(result).toContain('"A page with many words"')
  })

  test('escapes title containing double quotes', () => {
    const result = buildFrontmatter({ title: 'Page "Special" Title' })
    expect(result).toContain('"Page \\"Special\\" Title"')
  })

  test('escapes title containing newlines', () => {
    const result = buildFrontmatter({ title: 'Line 1\nLine 2' })
    expect(result).toContain('"Line 1\\nLine 2"')
  })

  test('produces valid YAML frontmatter for all inputs', () => {
    const dangerous = [
      { title: 'colon: here', description: 'hash # tag' },
      { title: 'brackets [yes]' },
      { description: 'quotes "and" more' },
    ]
    for (const input of dangerous) {
      const result = buildFrontmatter(input)
      expect(result.startsWith('---\n')).toBe(true)
      expect(result.endsWith('\n---')).toBe(true)
    }
  })
})
