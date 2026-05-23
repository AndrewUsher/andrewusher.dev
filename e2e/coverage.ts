import { test as base } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const COVERAGE_DIR = process.env.E2E_COVERAGE_DIR || './coverage/e2e'
const shouldCollect = process.env.E2E_COVERAGE === 'true'

export const test = base.extend({
  page: async ({ page, browserName }, use) => {
    if (shouldCollect && browserName === 'chromium') {
      await page.coverage.startJSCoverage({
        reportAnonymousScripts: false,
      })
    }

    await use(page)

    if (shouldCollect && browserName === 'chromium') {
      const coverage = await page.coverage.stopJSCoverage()
      if (coverage.length > 0) {
        mkdirSync(COVERAGE_DIR, { recursive: true })
        const filename = `coverage-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`
        writeFileSync(
          join(COVERAGE_DIR, filename),
          JSON.stringify(coverage),
        )
      }
    }
  },
})

export { expect } from '@playwright/test'
