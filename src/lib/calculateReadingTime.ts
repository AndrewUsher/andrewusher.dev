/**
 * Calculate estimated reading time for text content
 * @param content - Raw markdown or text content
 * @param wordsPerMinute - Reading speed (default: 200 wpm)
 * @returns Object with minutes and display string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): { minutes: number; display: string } {
  // Remove markdown syntax, code blocks, and extra whitespace
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*_~[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // Count words
  const wordCount = cleanContent.split(/\s+/).length

  // Calculate reading time
  const minutes = Math.ceil(wordCount / wordsPerMinute)

  // Format display string
  const display = minutes < 1 ? '< 1 min read' : `${minutes} min read`

  return { minutes, display }
}
