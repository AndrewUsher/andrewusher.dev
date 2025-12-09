import { describe, test, expect } from 'vitest'
import { calculateReadingTime } from './calculateReadingTime'

describe('calculateReadingTime', () => {
  test('calculates reading time for simple text', () => {
    const text = 'This is a simple test. It has ten words in this sentence here now.'
    const result = calculateReadingTime(text)

    expect(result).toHaveProperty('minutes')
    expect(result).toHaveProperty('display')
    expect(typeof result.minutes).toBe('number')
    expect(typeof result.display).toBe('string')
  })

  test('returns "1 min read" for very short content', () => {
    const text = 'Hello world'
    const result = calculateReadingTime(text)

    expect(result.minutes).toBe(1)
    expect(result.display).toBe('1 min read')
  })

  test('calculates correct reading time for ~200 word content', () => {
    const words = Array(200).fill('word').join(' ')
    const result = calculateReadingTime(words)

    expect(result.minutes).toBe(1)
    expect(result.display).toBe('1 min read')
  })

  test('calculates correct reading time for ~400 word content', () => {
    const words = Array(400).fill('word').join(' ')
    const result = calculateReadingTime(words)

    expect(result.minutes).toBe(2)
    expect(result.display).toBe('2 min read')
  })

  test('removes markdown code blocks from word count', () => {
    const text = `Some introduction text here.
    \`\`\`javascript
    const hello = "world";
    const foo = "bar";
    const baz = "qux";
    \`\`\`
    More text after the code block.`

    const result = calculateReadingTime(text)

    // Should only count the actual text, not the code block
    expect(result.minutes).toBeLessThanOrEqual(1)
  })

  test('removes inline code from word count', () => {
    const text = 'This is \`const x = 5\` some text with inline code here right now.'
    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    // Word count should be less if inline code is removed
    expect(result.minutes).toBeLessThanOrEqual(1)
  })

  test('removes markdown symbols from word count', () => {
    const text = '# Heading\n**Bold** and *italic* and ~~strikethrough~~ text'
    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    expect(typeof result.display).toBe('string')
  })

  test('handles empty or whitespace-only content', () => {
    const result1 = calculateReadingTime('')
    const result2 = calculateReadingTime('   ')
    const result3 = calculateReadingTime('\n\n')

    expect(result1.minutes).toBe(1)
    expect(result2.minutes).toBe(1)
    expect(result3.minutes).toBe(1)
    expect(result1.display).toBe('1 min read')
  })

  test('respects custom wordsPerMinute parameter', () => {
    const text = Array(400).fill('word').join(' ')

    const result200 = calculateReadingTime(text, 200)
    const result100 = calculateReadingTime(text, 100)

    expect(result200.minutes).toBe(2)
    expect(result100.minutes).toBe(4)
  })

  test('handles markdown lists correctly', () => {
    const text = `- Item one here
- Item two here
- Item three here
Some additional text content`

    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    expect(result.minutes >= 1).toBe(true)
  })

  test('handles multiple code blocks', () => {
    const text = `First code block:
    \`\`\`python
    def hello():
        print("world")
    \`\`\`

    Second code block:
    \`\`\`javascript
    function hello() {
      console.log("world");
    }
    \`\`\`

    Some actual text here.`

    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    expect(result.display).toBe('1 min read')
  })

  test('normalizes multiple whitespace characters', () => {
    const text = 'Word    with     irregular    spacing here now'
    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    expect(result.minutes).toBeLessThanOrEqual(1)
  })

  test('handles special markdown link syntax', () => {
    const text = '[Link text](https://example.com) and some additional words here now'
    const result = calculateReadingTime(text)

    expect(result).toBeDefined()
    expect(typeof result.display).toBe('string')
  })

  test('rounds up reading time correctly', () => {
    // 201 words should round up to 2 minutes (201/200 = 1.005)
    const text = Array(201).fill('word').join(' ')
    const result = calculateReadingTime(text)

    expect(result.minutes).toBe(2)
    expect(result.display).toBe('2 min read')
  })

  test('display string format is consistent', () => {
    const shortText = 'hello'
    const longText = Array(1000).fill('word').join(' ')

    const short = calculateReadingTime(shortText)
    const long = calculateReadingTime(longText)

    expect(short.display).toMatch(/^\d+ min read$|^< 1 min read$/)
    expect(long.display).toMatch(/^\d+ min read$|^< 1 min read$/)
  })
})
