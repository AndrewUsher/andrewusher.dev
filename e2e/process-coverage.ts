import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import v8ToIstanbul from 'v8-to-istanbul'

const COVERAGE_DIR = process.env.E2E_COVERAGE_DIR || './coverage/e2e'
const NYC_OUTPUT_DIR = join(COVERAGE_DIR, '.nyc_output')

async function processCoverage() {
  if (!existsSync(COVERAGE_DIR)) {
    console.log(`No coverage directory found at ${COVERAGE_DIR}`)
    process.exit(1)
  }

  const files = readdirSync(COVERAGE_DIR).filter(
    f => f.startsWith('coverage-') && f.endsWith('.json')
  )

  if (files.length === 0) {
    console.log(`No coverage files found in ${COVERAGE_DIR}`)
    process.exit(0)
  }

  console.log(`Processing ${files.length} coverage files...`)

  const allEntries = files.flatMap(f =>
    JSON.parse(readFileSync(join(COVERAGE_DIR, f), 'utf-8'))
  )

  const grouped = new Map<string, { url: string; functions: { functionName: string; ranges: { startOffset: number; endOffset: number; count: number }[]; isBlockCoverage: boolean }[]; source?: string }>()
  for (const entry of allEntries) {
    if (!entry.url || entry.url.startsWith('blob:') || entry.url.startsWith('chrome-extension:')) continue
    if (entry.functions.length === 0) continue

    if (grouped.has(entry.url)) {
      const existing = grouped.get(entry.url)!
      for (const fn of entry.functions) {
        const match = existing.functions.find(f => f.functionName === fn.functionName)
        if (match) {
          match.ranges.push(...fn.ranges)
        } else {
          existing.functions.push(fn)
        }
      }
    } else {
      grouped.set(entry.url, {
        url: entry.url,
        functions: [...entry.functions],
      })
    }
  }

  const istanbulCoverage: Record<string, unknown> = {}

  for (const [url, entry] of grouped) {
    try {
      const converter = v8ToIstanbul(url)
      await converter.load()
      converter.applyCoverage(entry.functions)
      Object.assign(istanbulCoverage, converter.toIstanbul())
    } catch {
      // skip files that can't be converted (external URLs, etc.)
    }
  }

  mkdirSync(NYC_OUTPUT_DIR, { recursive: true })
  writeFileSync(
    join(NYC_OUTPUT_DIR, 'out.json'),
    JSON.stringify(istanbulCoverage, null, 2),
  )

  const fileCount = Object.keys(istanbulCoverage).length
  console.log(`\nCoverage report written to ${NYC_OUTPUT_DIR}/out.json`)
  console.log(`Source files covered: ${fileCount}`)
  console.log('\nGenerate reports with: npx c8 report --reporter=text --reporter=lcov --temp-directory=' + COVERAGE_DIR)
}

processCoverage().catch(console.error)
