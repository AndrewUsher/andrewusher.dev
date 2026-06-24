import { describe, test, expect, vi } from 'vitest'
import { handleMarkdownNegotiation } from './middleware'
import { turndownService } from './convert'

function createInput({
  pathname = '/',
  accept = '',
  contentType = 'text/html',
  body = '<html><head><meta name="title" content="Test"><meta name="description" content="Desc"></head><body><h1>Hello</h1></body></html>',
  status = 200,
}: {
  pathname?: string
  accept?: string
  contentType?: string
  body?: string | null
  status?: number
} = {}) {
  const headers = new Headers()
  if (contentType) headers.set('content-type', contentType)

  const response = body !== null
    ? new Response(body, { status, headers })
    : new Response(null, { status, headers })

  return { pathname, accept, response }
}

describe('handleMarkdownNegotiation', () => {
  describe('returns null (passthrough)', () => {
    test('when not requesting markdown', async () => {
      const input = createInput({ accept: 'text/html' })
      const result = await handleMarkdownNegotiation(input)
      expect(result).toBeNull()
    })

    test('when path starts with /api/', async () => {
      const input = createInput({
        pathname: '/api/views/test',
        accept: 'text/markdown',
      })
      const result = await handleMarkdownNegotiation(input)
      expect(result).toBeNull()
    })

    test('when response is non-HTML content type', async () => {
      const input = createInput({
        accept: 'text/markdown',
        contentType: 'application/json',
        body: '{"key":"value"}',
      })
      const result = await handleMarkdownNegotiation(input)
      expect(result).toBeNull()
    })

    test('when response has no body', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: null,
      })
      const result = await handleMarkdownNegotiation(input)
      expect(result).toBeNull()
    })

    test('when accept header is missing', async () => {
      const input = createInput()
      const result = await handleMarkdownNegotiation(input)
      expect(result).toBeNull()
    })
  })

  describe('returns markdown response', () => {
    test('when Accept includes text/markdown', async () => {
      const input = createInput({ accept: 'text/markdown' })
      const result = await handleMarkdownNegotiation(input)

      expect(result).not.toBeNull()
      expect(result!.headers.get('content-type')).toContain('text/markdown')
      expect(result!.headers.get('x-markdown-tokens')).toBeTruthy()
      expect(result!.headers.get('vary')).toBe('accept')
    })

    test('content-type is text/markdown', async () => {
      const input = createInput({ accept: 'text/markdown' })
      const result = await handleMarkdownNegotiation(input)

      expect(result!.headers.get('content-type')).toBe(
        'text/markdown; charset=utf-8',
      )
    })

    test('contains frontmatter with title and description', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: '<html><head><meta name="title" content="Page Title"><meta name="description" content="Page Description"></head><body><h1>Hello</h1></body></html>',
      })
      const result = await handleMarkdownNegotiation(input)
      const text = await result!.text()

      expect(text).toContain('title: "Page Title"')
      expect(text).toContain('description: "Page Description"')
      expect(text).toContain('---')
    })

    test('contains converted body content', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: '<html><body><h1>Hello World</h1><p>This is a paragraph.</p></body></html>',
      })
      const result = await handleMarkdownNegotiation(input)
      const text = await result!.text()

      expect(text).toContain('# Hello World')
      expect(text).toContain('This is a paragraph.')
    })

    test('strips nav, header, footer from output', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: '<html><body><nav><a href="/">Home</a></nav><header>Site Header</header><main><p>Content</p></main><footer>Copyright</footer></body></html>',
      })
      const result = await handleMarkdownNegotiation(input)
      const text = await result!.text()

      expect(text).toContain('Content')
      expect(text).not.toContain('Site Header')
      expect(text).not.toContain('Copyright')
    })

    test('preserves response status', async () => {
      const input = createInput({ accept: 'text/markdown', status: 200 })
      const result = await handleMarkdownNegotiation(input)
      expect(result!.status).toBe(200)
    })
  })

  describe('error handling', () => {
    test('returns null when clone.text() fails', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: '<html><body>Valid</body></html>',
      })

      const badClone = new Response('<html><body>Valid</body></html>', {
        headers: { 'content-type': 'text/html' },
      })
      vi.spyOn(badClone, 'text').mockRejectedValue(new Error('Parse error'))
      const cloneSpy = vi
        .spyOn(input.response, 'clone')
        .mockReturnValue(badClone)
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const result = await handleMarkdownNegotiation(input)

      expect(result).toBeNull()
      consoleSpy.mockRestore()
      cloneSpy.mockRestore()
    })

    test('original response body remains usable after failed conversion', async () => {
      const input = createInput({
        accept: 'text/markdown',
        body: '<html><body>Original content preserved</body></html>',
      })

      const turndownSpy = vi
        .spyOn(turndownService, 'turndown')
        .mockImplementation(() => {
          throw new Error('Conversion failed')
        })
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const result = await handleMarkdownNegotiation(input)

      expect(result).toBeNull()

      const originalBody = await input.response.text()
      expect(originalBody).toContain('Original content preserved')

      consoleSpy.mockRestore()
      turndownSpy.mockRestore()
    })
  })
})
