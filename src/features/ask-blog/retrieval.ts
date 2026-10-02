import type { BlogChunk, ChatSource } from './types'

const STOP_WORDS = new Set('a an and are as at be by can do does for from how i in is it me my of on or please show that the their them there these they this to us was what when where which why will with would you your explain more example'.split(' '))

function terms(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}_]+/gu) ?? []).filter(word => !STOP_WORDS.has(word) && word.length > 1)
}

export function retrieveChunks(chunks: BlogChunk[], question: string, vector?: number[]): BlogChunk[] {
  const query = [...new Set(terms(question))]
  const documents = chunks.map(chunk => terms(`${chunk.title} ${chunk.heading} ${chunk.text}`))
  const frequencies = new Map<string, number>()
  for (const document of documents) {
    for (const term of new Set(document)) frequencies.set(term, (frequencies.get(term) ?? 0) + 1)
  }
  const average = documents.reduce((sum, document) => sum + document.length, 0) / (documents.length || 1)
  const scores = chunks.map((chunk, index) => {
    const document = documents[index]!
    const counts = new Map<string, number>()
    for (const word of document) counts.set(word, (counts.get(word) ?? 0) + 1)
    let lexical = 0
    for (const term of query) {
      const frequency = counts.get(term) ?? 0
      const inverse = Math.log(1 + (chunks.length - (frequencies.get(term) ?? 0) + 0.5) / ((frequencies.get(term) ?? 0) + 0.5))
      lexical += inverse * frequency * 2.2 / (frequency + 1.2 * (0.25 + 0.75 * document.length / (average || 1)))
    }
    const semantic = vector && vector.length === chunk.embedding.length
      ? vector.reduce((sum, value, dimension) => sum + value * chunk.embedding[dimension]!, 0)
      : 0
    return { chunk, lexical, semantic }
  })
  const lexical = [...scores].filter(item => item.lexical > 0).sort((a, b) => b.lexical - a.lexical)
  const semantic = [...scores].filter(item => item.semantic >= 0.35).sort((a, b) => b.semantic - a.semantic)
  const fused = new Map<BlogChunk, number>()
  for (const ranking of [lexical, semantic]) {
    ranking.slice(0, 20).forEach((item, rank) => fused.set(item.chunk, (fused.get(item.chunk) ?? 0) + 1 / (60 + rank)))
  }
  const headingCounts = new Map<string, number>()
  return [...fused].sort((a, b) => b[1] - a[1]).map(([chunk]) => chunk).filter(chunk => {
    const count = headingCounts.get(chunk.url) ?? 0
    if (count >= 2) return false
    headingCounts.set(chunk.url, count + 1)
    return true
  }).slice(0, 6)
}

export function toSources(chunks: BlogChunk[]): ChatSource[] {
  return chunks.map((chunk, index) => ({
    number: index + 1,
    title: chunk.title,
    heading: chunk.heading,
    url: chunk.url,
    excerpt: chunk.text.slice(0, 700),
  }))
}
