import { describe, test, expect } from 'vitest'
import NavLink from './NavLink.astro'
import { renderAstroComponent } from '../test/helpers'

describe('NavLink', () => {
  test('renders link with correct href', async () => {
    const { document } = await renderAstroComponent(NavLink, {
      props: { href: '/about' },
      slots: { default: 'About Me' },
    })

    const link = document.querySelector('a')
    expect(link).toBeTruthy()
    expect(link?.getAttribute('href')).toBe('/about')
  })

  test('renders slot content', async () => {
    const { document } = await renderAstroComponent(NavLink, {
      props: { href: '/blog' },
      slots: { default: 'Blog' },
    })

    const link = document.querySelector('a')
    expect(link?.textContent?.trim()).toBe('Blog')
  })

  test('applies correct CSS classes', async () => {
    const { document } = await renderAstroComponent(NavLink, {
      props: { href: '/contact' },
      slots: { default: 'Contact' },
    })

    const link = document.querySelector('a')
    const classes = link?.getAttribute('class')?.split(' ') || []

    expect(classes).toContain('ml-8')
    expect(classes).toContain('block')
    expect(classes).toContain('lg:text-xl')
    expect(classes).toContain('first:ml-0')
    expect(classes).toContain('dark:text-white')
    expect(classes).toContain('text-base')
  })
})
