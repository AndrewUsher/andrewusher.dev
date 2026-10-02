import type { AstroIntegration } from 'astro'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

export default function askBlog(enabled: boolean): AstroIntegration {
  const generate = async () => {
    if (!enabled) return
    // Astro closes its config module runner before build hooks execute. Run
    // indexing in Node so late ML imports don't depend on that Vite runner.
    const { stdout } = await promisify(execFile)(process.execPath, ['--import', 'tsx', 'scripts/ask-blog-index.ts'], { timeout: 300_000 })
    console.info(stdout.trim())
  }
  return {
    name: 'ask-blog',
    hooks: {
      'astro:build:start': generate,
      'astro:server:setup': generate,
      'astro:build:generated': async () => {
        if (!enabled) return
        const { stdout } = await promisify(execFile)(process.execPath, ['--import', 'tsx', 'scripts/verify-blog-index.ts'], { timeout: 60_000 })
        console.info(stdout.trim())
      },
    },
  }
}
