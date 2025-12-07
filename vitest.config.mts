/// <reference types="astro/client" />
import { getViteConfig } from 'astro/config'
import { configDefaults } from 'vitest/config'

export default getViteConfig({
  test: {
    // Use node environment for Astro component tests (see https://github.com/withastro/astro/issues/14895)
    // React component tests can override with // @vitest-environment jsdom
    environment: 'node',
    globals: true,
    reporters: 'verbose',
    setupFiles: ['./vitest.setup.js'],
    exclude: [...configDefaults.exclude, 'e2e'],
  },
})
