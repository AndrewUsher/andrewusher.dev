import { describe, test, expect } from 'vitest'
import ReadingTime from './ReadingTime.astro'
import { renderAstroComponent } from '../test/helpers'

describe('ReadingTime', () => {
  test('renders reading time with minutes', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 5,
        display: '5 min read',
      },
    })

    const span = document.querySelector('span')
    expect(span).toBeTruthy()
    expect(span?.textContent?.trim()).toBe('5 min read')
  })

  test('renders reading time with display string provided', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 1,
        display: '< 1 min read',
      },
    })

    const span = document.querySelector('span')
    expect(span?.textContent?.trim()).toBe('< 1 min read')
  })

  test('generates display string when not provided', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 3,
      },
    })

    const span = document.querySelector('span')
    expect(span?.textContent?.trim()).toBe('3 min read')
  })

  test('generates "< 1 min read" for less than 1 minute', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 0,
      },
    })

    const span = document.querySelector('span')
    expect(span?.textContent?.trim()).toBe('< 1 min read')
  })

  test('applies default CSS classes', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 2,
      },
    })

    const span = document.querySelector('span')
    const classes = span?.getAttribute('class')?.split(' ') || []

    expect(classes).toContain('text-sm')
    expect(classes).toContain('tracking-wide')
    expect(classes).toContain('text-slate-700')
    expect(classes).toContain('dark:text-slate-500')
  })

  test('applies custom CSS classes when provided', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 2,
        className: 'text-lg font-bold text-blue-600',
      },
    })

    const span = document.querySelector('span')
    const classes = span?.getAttribute('class')?.split(' ') || []

    expect(classes).toContain('text-lg')
    expect(classes).toContain('font-bold')
    expect(classes).toContain('text-blue-600')
  })

  test('renders with both minutes and display props', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 10,
        display: '10 minutes to read',
        className: 'custom-class',
      },
    })

    const span = document.querySelector('span')
    expect(span?.textContent?.trim()).toBe('10 minutes to read')
    expect(span?.getAttribute('class')).toContain('custom-class')
  })

  test('renders semantic HTML for accessibility', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 4,
      },
    })

    const span = document.querySelector('span')
    expect(span).toBeTruthy()
    expect(span?.tagName).toBe('SPAN')
  })

  test('handles large minute values', async () => {
    const { document } = await renderAstroComponent(ReadingTime, {
      props: {
        minutes: 45,
        display: '45 min read',
      },
    })

    const span = document.querySelector('span')
    expect(span?.textContent?.trim()).toBe('45 min read')
  })
})
