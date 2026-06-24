import { describe, test, expect } from 'vitest'
import { turndownService } from './convert'

describe('convert', () => {
  test('converts h1 to ATX heading', () => {
    const result = turndownService.turndown('<h1>Hello World</h1>')
    expect(result).toMatch(/^# Hello World/)
  })

  test('converts h2 to ATX heading', () => {
    const result = turndownService.turndown('<h2>Section</h2>')
    expect(result).toMatch(/^## Section/)
  })

  test('converts paragraphs', () => {
    const result = turndownService.turndown('<p>Some text here</p>')
    expect(result).toBe('Some text here')
  })

  test('converts links with inline style', () => {
    const result = turndownService.turndown('<a href="https://example.com">Example</a>')
    expect(result).toBe('[Example](https://example.com)')
  })

  test('converts bold text', () => {
    const result = turndownService.turndown('<strong>Important</strong>')
    expect(result).toBe('**Important**')
  })

  test('converts italic text', () => {
    const result = turndownService.turndown('<em>Emphasis</em>')
    expect(result).toBe('*Emphasis*')
  })

  test('converts unordered list', () => {
    const result = turndownService.turndown('<ul><li>Item A</li><li>Item B</li></ul>')
    expect(result).toBe('-   Item A\n-   Item B')
  })

  test('converts ordered list', () => {
    const result = turndownService.turndown('<ol><li>First</li><li>Second</li></ol>')
    expect(result).toBe('1.  First\n2.  Second')
  })

  test('converts code block with fenced style', () => {
    const result = turndownService.turndown('<pre><code>const x = 1</code></pre>')
    expect(result).toMatch(/```\nconst x = 1\n```/)
  })

  test('removes nav elements', () => {
    const result = turndownService.turndown('<nav><a href="/">Home</a></nav><p>Content</p>')
    expect(result).not.toContain('Home')
    expect(result).toContain('Content')
  })

  test('removes header elements', () => {
    const result = turndownService.turndown('<header><h1>Site Header</h1></header><p>Content</p>')
    expect(result).not.toContain('Site Header')
    expect(result).toContain('Content')
  })

  test('removes footer elements', () => {
    const result = turndownService.turndown('<footer><p>Footer</p></footer><p>Content</p>')
    expect(result).not.toContain('Footer')
    expect(result).toContain('Content')
  })

  test('removes script elements', () => {
    const result = turndownService.turndown('<script>alert("evil")</script><p>Content</p>')
    expect(result).not.toContain('evil')
    expect(result).toContain('Content')
  })

  test('removes style elements', () => {
    const result = turndownService.turndown('<style>.foo { color: red; }</style><p>Content</p>')
    expect(result).not.toContain('color: red')
    expect(result).toContain('Content')
  })

  test('removes iframe elements', () => {
    const result = turndownService.turndown('<iframe src="https://example.com"></iframe><p>Content</p>')
    expect(result).not.toContain('iframe')
    expect(result).toContain('Content')
  })

  test('removes noscript elements', () => {
    const result = turndownService.turndown('<noscript>JS required</noscript><p>Content</p>')
    expect(result).not.toContain('JS required')
    expect(result).toContain('Content')
  })

  test('handles full document structure', () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <header><nav><a href="/">Home</a></nav></header>
          <main>
            <h1>Blog Post</h1>
            <p>This is the content.</p>
          </main>
          <footer><p>Copyright</p></footer>
        </body>
      </html>
    `
    const result = turndownService.turndown(html)
    expect(result).toContain('# Blog Post')
    expect(result).toContain('This is the content.')
    expect(result).not.toContain('Home')
    expect(result).not.toContain('Copyright')
  })

  test('handles empty input', () => {
    expect(turndownService.turndown('')).toBe('')
  })
})
