import { describe, test, expect } from 'vitest'
import { extractMeta } from './extract-meta'

describe('extractMeta', () => {
  test('extracts title from meta name="title"', () => {
    const html = '<html><head><meta name="title" content="My Page Title"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'My Page Title' })
  })

  test('extracts title from og:title as fallback', () => {
    const html = '<html><head><meta property="og:title" content="OG Title"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'OG Title' })
  })

  test('extracts title from <title> tag as last fallback', () => {
    const html = '<html><head><title>HTML Title</title></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'HTML Title' })
  })

  test('prefers meta name="title" over og:title and <title>', () => {
    const html = '<html><head><meta name="title" content="Meta Title"><meta property="og:title" content="OG Title"><title>HTML Title</title></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'Meta Title' })
  })

  test('prefers og:title over <title> when meta name="title" is absent', () => {
    const html = '<html><head><meta property="og:title" content="OG Title"><title>HTML Title</title></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'OG Title' })
  })

  test('extracts description from meta name="description"', () => {
    const html = '<html><head><meta name="description" content="A page description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'A page description' })
  })

  test('extracts description from og:description as fallback', () => {
    const html = '<html><head><meta property="og:description" content="OG description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'OG description' })
  })

  test('prefers meta name="description" over og:description', () => {
    const html = '<html><head><meta name="description" content="Meta desc"><meta property="og:description" content="OG desc"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'Meta desc' })
  })

  test('extracts both title and description together', () => {
    const html = '<html><head><meta name="title" content="Title"><meta name="description" content="Description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'Title', description: 'Description' })
  })

  test('returns empty object when no meta tags found', () => {
    const html = '<html><head></head><body><p>No meta here</p></body></html>'
    expect(extractMeta(html)).toEqual({})
  })

  test('handles empty HTML string', () => {
    expect(extractMeta('')).toEqual({})
  })

  test('handles HTML without meta tags gracefully', () => {
    const html = '<html><head></head><body><p>No meta</p></body></html>'
    expect(extractMeta(html)).toEqual({})
  })

  test('handles HTML with special characters in content', () => {
    const html = '<html><head><meta name="title" content="Hello &amp; Welcome | My Site"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'Hello &amp; Welcome | My Site' })
  })

  test('extracts title from single-quoted meta tags', () => {
    const html = '<html><head><meta name=\'title\' content=\'My Title\'></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'My Title' })
  })

  test('extracts description from single-quoted meta tags', () => {
    const html = '<html><head><meta name=\'description\' content=\'My Desc\'></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'My Desc' })
  })

  test('extracts title when content attribute appears before name', () => {
    const html = '<html><head><meta content="My Title" name="title"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'My Title' })
  })

  test('extracts description when content appears before name', () => {
    const html = '<html><head><meta content="My Desc" name="description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'My Desc' })
  })

  test('extracts og:title when content appears before property', () => {
    const html = '<html><head><meta content="OG Title" property="og:title"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'OG Title' })
  })

  test('extracts og:description when content appears before property', () => {
    const html = '<html><head><meta content="OG Desc" property="og:description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'OG Desc' })
  })

  test('extracts title from single-quoted tags with reordered attributes', () => {
    const html = '<html><head><meta content=\'Reversed\' name=\'title\'></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'Reversed' })
  })

  test('prefers meta name="title" over og:title with reordered attributes', () => {
    const html = '<html><head><meta content="OG" property="og:title"><meta content="Standard" name="title"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ title: 'Standard' })
  })

  test('prefers meta name="description" over og:description with mixed quoting', () => {
    const html = '<html><head><meta content=\'OG Desc\' property=\'og:description\'><meta content="Standard Desc" name="description"></head><body></body></html>'
    expect(extractMeta(html)).toEqual({ description: 'Standard Desc' })
  })
})
