import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rename, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { extractSections, splitChunkText } from './chunks'
import { EMBEDDING_MODEL, INDEX_FILE, INDEX_VERSION, MODEL_DIRECTORY, MODEL_FILES, MODEL_REVISION } from './config'
import { embedText, getEmbedder } from './embeddings'
import type { BlogIndex, BlogChunk } from './types'

async function downloadModel(): Promise<void> {
  for (const file of MODEL_FILES) {
    const destination = join(MODEL_DIRECTORY, file)
    try {
      await access(destination)
      continue
    } catch { /* Cold build cache. */ }
    const response = await fetch(`https://huggingface.co/${EMBEDDING_MODEL}/resolve/${MODEL_REVISION}/${file}`, {
      signal: AbortSignal.timeout(120_000),
    })
    if (!response.ok) throw new Error(`Model download failed (${response.status}): ${file}`)
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(`${destination}.tmp`, Buffer.from(await response.arrayBuffer()))
    await rename(`${destination}.tmp`, destination)
  }
}

export async function buildBlogIndex(): Promise<void> {
  const started = Date.now()
  await downloadModel()
  const model = await getEmbedder()
  let previous: BlogIndex | undefined
  try { previous = JSON.parse(await readFile(INDEX_FILE, 'utf8')) as BlogIndex } catch { /* First build. */ }
  const compatible = previous?.version === INDEX_VERSION && previous.model === EMBEDDING_MODEL && previous.revision === MODEL_REVISION
  const cached = new Map(compatible ? previous!.chunks.map(chunk => [chunk.id, chunk.embedding]) : [])
  const chunks: BlogChunk[] = []
  let posts = 0
  let generated = 0
  for (const file of (await readdir('content/blog')).sort()) {
    if (!/\.mdx?$/.test(file)) continue
    const sections = extractSections(await readFile(join('content/blog', file), 'utf8'), file.endsWith('.mdx'))
    if (sections.length) posts++
    for (const section of sections) {
      const prefix = `${section.title}\n${section.heading}\n`
      const count = (text: string) => model.tokenizer.encode(text, { add_special_tokens: false }).length
      const budget = 250 - count(prefix)
      if (budget < 32) throw new Error(`Heading metadata exceeds embedding budget: ${section.url}`)
      for (const text of splitChunkText(section.text, count, budget)) {
        const id = createHash('sha256').update(`${section.url}\n${prefix}${text}`).digest('hex')
        const embedding = cached.get(id) ?? await embedText(`${prefix}${text}`)
        if (!cached.has(id)) generated++
        chunks.push({ ...section, text, id, embedding })
      }
    }
  }
  const index: BlogIndex = { version: INDEX_VERSION, model: EMBEDDING_MODEL, revision: MODEL_REVISION, chunks }
  await mkdir(dirname(INDEX_FILE), { recursive: true })
  await writeFile(`${INDEX_FILE}.tmp`, JSON.stringify(index))
  await rename(`${INDEX_FILE}.tmp`, INDEX_FILE)
  console.info(`[ask-blog] ${posts} published posts, ${chunks.length} chunks, ${generated} new embeddings (${Date.now() - started}ms)`)
}
