import { test, expect } from './coverage'

test.describe('Homepage', () => {
  test('page loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('has correct default title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Andrew Usher')
  })

  test('sets cache-control header for ISR', async ({ page }) => {
    const response = await page.goto('/')
    const cacheControl = response?.headers()['cache-control']
    expect(cacheControl).toContain('s-maxage=1800')
    expect(cacheControl).toContain('stale-while-revalidate')
  })

  test.describe('Header navigation', () => {
    test('displays site name linking to homepage', async ({ page }) => {
      await page.goto('/')
      const link = page.locator('header').getByRole('link', { name: 'Andrew Usher' })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', '/')
    })

    test('contains desktop navigation links', async ({ page }) => {
      await page.goto('/')
      const navLinks = page.locator('header nav').first()
      await expect(navLinks.getByRole('link', { name: 'About Me' })).toBeVisible()
      await expect(navLinks.getByRole('link', { name: 'Blog' })).toBeVisible()
      await expect(navLinks.getByRole('link', { name: 'Resume' })).toBeVisible()
    })
  })

  test.describe('Homepage content', () => {
    test('displays intro section with greeting', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByText(/Greetings! I am a systems engineer/)).toBeVisible()
    })

    test('displays intro link to about page', async ({ page }) => {
      await page.goto('/')
      const aboutLink = page.getByRole('link', { name: /Read more about me here/ })
      await expect(aboutLink).toBeVisible()
      await expect(aboutLink).toHaveAttribute('href', '/about')
    })

    test('displays all IntroSectionCards with correct links', async ({ page }) => {
      await page.goto('/')

      const cards = [
        { heading: 'Blog', url: '/blog' },
        { heading: 'Projects', url: '/projects' },
        { heading: 'Uses', url: '/uses' },
        { heading: 'Things I Like', url: '/things-i-like' },
        { heading: 'Get In Touch', url: '/contact' },
      ]

      const cardsContainer = page.locator('.my-12.grid')
      for (const card of cards) {
        const link = cardsContainer.locator(`a[href="${card.url}"]`)
        await expect(link).toBeVisible()
        await expect(link.getByText(card.heading)).toBeVisible()
      }
    })

    test('IntroSectionCards navigate to correct pages', async ({ page }) => {
      const pages = ['/blog', '/projects', '/uses', '/things-i-like', '/contact']
      for (const url of pages) {
        const response = await page.goto(url)
        expect(response?.status()).toBe(200)
      }
    })

    test('displays Recent Blog Posts section', async ({ page }) => {
      await page.goto('/')
      await expect(
        page.getByRole('heading', { name: 'Recent Blog Posts' })
      ).toBeVisible()
    })

    test('displays Recent Projects section', async ({ page }) => {
      await page.goto('/')
      await expect(
        page.getByRole('heading', { name: 'Recent Projects' })
      ).toBeVisible()
    })

    test('displays Buy Me A Coffee button in footer', async ({ page }) => {
      await page.goto('/')
      await expect(
        page.locator('footer').locator('img[alt="Buy Me A Coffee"]')
      ).toBeVisible()
    })
  })

  test.describe('Footer', () => {
    test('contains navigation links', async ({ page }) => {
      await page.goto('/')
      const footer = page.locator('footer')
      const links = ['About Me', 'Blog', 'Get in touch', 'Projects', 'Uses']
      for (const name of links) {
        await expect(footer.getByRole('link', { name })).toBeVisible()
      }
    })

    test('contains social media links', async ({ page }) => {
      await page.goto('/')
      const footer = page.locator('footer')
      await expect(footer.getByLabel('Twitter')).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
        'href',
        'https://twitter.com/AndrewUsher17'
      )
      await expect(footer.getByLabel('GitHub')).toBeVisible()
      await expect(footer.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
        'href',
        'https://github.com/AndrewUsher'
      )
      await expect(footer.getByLabel('RSS Feed')).toBeVisible()
    })
  })

  test.describe('Mobile responsive', () => {
    test.use({ viewport: { width: 375, height: 812 } })

    test('displays mobile navigation links', async ({ page }) => {
      await page.goto('/')
      const mobileNav = page.locator('header nav').last()
      await expect(mobileNav.getByRole('link', { name: 'Blog' })).toBeVisible()
      await expect(mobileNav.getByRole('link', { name: 'Contact Me' })).toBeVisible()
      await expect(mobileNav.getByRole('link', { name: 'Resume' })).toBeVisible()
    })

    test('page has no horizontal overflow on mobile', async ({ page }) => {
      await page.goto('/')
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = await page.evaluate(() => window.innerWidth)
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth * 1.05)
    })
  })
})
