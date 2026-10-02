import { expect, test } from 'vitest'
import { extractSections, splitChunkText } from './chunks'

function post(content: string, published = true) {
  return `\n\n---\nisPublished: ${published}\nslug: example\ntitle: Example\n---\n${content}`
}

test('indexes older posts with leading blank lines and excludes drafts', () => {
  expect(extractSections(post('Hello world.'))).toEqual([{ title: 'Example', heading: 'Introduction', url: '/blog/example', text: 'Hello world.' }])
  expect(extractSections(post('Draft secret.', false))).toEqual([])
})

test('preserves fenced code, excludes MDX components, and uses heading hierarchy and duplicate anchors', () => {
  const sections = extractSections(post(`import Demo from './Demo'\n\n## Reading \`cookies\`\n\nRead **this**.\n\n<Demo />\n\n### Examples\n\n\`\`\`js\nimport { cookieStore } from './cookies'\n\`\`\`\n\n## Reading \`cookies\`\n\nAgain.`), true)
  expect(sections.map(section => section.url)).toEqual(['/blog/example#reading-cookies', '/blog/example#examples', '/blog/example#reading-cookies-1'])
  expect(sections[1]?.heading).toBe('Reading cookies / Examples')
  expect(sections[1]?.text).toContain("import { cookieStore } from './cookies'")
  expect(sections.map(section => section.text).join(' ')).not.toContain('Demo')
})

test('bounds chunks by tokenizer size while keeping original code text and overlapping context', () => {
  const count = (text: string) => text.trim().split(/\s+/).length
  const source = 'const A = 1;\nconst B = 2;\nconst C = 3;'
  const chunks = splitChunkText(source, count, 8, 3)
  expect(chunks.every(chunk => count(chunk) <= 8)).toBe(true)
  expect(chunks[0]).toBe('const A = 1;\nconst B = 2;')
  expect(chunks[1]).toContain('B = 2;\nconst C = 3;')
})

test('splits long unbroken payloads instead of truncating them', () => {
  const chunks = splitChunkText('abcdefghijk', text => text.length, 4, 1)
  expect(chunks.join('')).toBe('abcdefghijk')
  expect(chunks.every(chunk => chunk.length <= 4)).toBe(true)
})
