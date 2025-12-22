import { execSync } from 'child_process'
import { existsSync } from 'fs'

export default function pagefindIntegration() {
  return {
    name: 'pagefind-integration',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const targetDir = dir.pathname.replace(/\/$/, '')

        console.log(`Running Pagefind on ${targetDir}`)

        if (!existsSync(targetDir)) {
          console.warn(`Target directory ${targetDir} does not exist`)
          return
        }

        try {
          execSync(`npx pagefind --site "${targetDir}"`, {
            stdio: 'inherit'
          })
          console.log('Pagefind indexing complete')
        } catch (error) {
          console.error('Pagefind indexing failed:', error)
          throw error
        }
      }
    }
  }
}
