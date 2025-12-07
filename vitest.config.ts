import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: 'verbose',
    setupFiles: ['./vitest.setup.js'],
    exclude: [...configDefaults.exclude, 'e2e'],
  },
})
