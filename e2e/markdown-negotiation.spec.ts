import { test, expect } from './coverage'

test.describe('Markdown for Agents', () => {
  test.describe('default HTML responses', () => {
    test('homepage returns HTML by default', async ({ page }) => {
      const response = await page.goto('/')
      expect(response?.headers()['content-type']).toContain('text/html')
    })
  })

  test.describe('markdown negotiation', () => {
    test('homepage returns markdown with Accept: text/markdown', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      expect(response.headers()['content-type']).toContain('text/markdown')
    })

    test('returns x-markdown-tokens header', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      const tokens = response.headers()['x-markdown-tokens']
      expect(tokens).toBeTruthy()
      expect(Number(tokens)).toBeGreaterThan(0)
    })

    test('returns vary: accept header', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      expect(response.headers()['vary']).toContain('accept')
    })
  })

  test.describe('markdown content', () => {
    test('response starts with YAML frontmatter', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      const body = await response.text()
      expect(body.startsWith('---')).toBe(true)
    })

    test('frontmatter contains title', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      const body = await response.text()
      expect(body).toMatch(/^---\ntitle: .+/m)
    })

    test('contains converted markdown content', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      const body = await response.text()

      expect(body).toContain('Andrew Usher')
      expect(body).not.toContain('<header>')
      expect(body).not.toContain('<footer>')
      expect(body).not.toContain('<nav>')
    })

    test('converts headings to ATX style', async ({ request }) => {
      const response = await request.get('/', {
        headers: { Accept: 'text/markdown' },
      })
      const body = await response.text()
      expect(body).toMatch(/^#{1,6}\s/m)
    })
  })

  test.describe('skip conditions', () => {
    test('API routes are not converted to markdown', async ({ request }) => {
      const response = await request.get('/api/views/test-slug', {
        headers: { Accept: 'text/markdown' },
      })
      const contentType = response.headers()['content-type'] || ''
      expect(contentType).not.toContain('text/markdown')
    })

    test('robots.txt is not converted to markdown', async ({ request }) => {
      const response = await request.get('/robots.txt', {
        headers: { Accept: 'text/markdown' },
      })
      const contentType = response.headers()['content-type'] || ''
      expect(contentType).not.toContain('text/markdown')
    })
  })

  test.describe('RSS Link header', () => {
    test('homepage sets Link header with RSS and sitemap', async ({ page }) => {
      const response = await page.goto('/')
      const link = response?.headers()['link']
      expect(link).toContain('</rss.xml>')
      expect(link).toContain('</sitemap.xml>')
    })
  })
})
