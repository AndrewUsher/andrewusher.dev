import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: 'verbose',
    setupFiles: ['./vitest.setup.js'],
    testTransformMode: {
      web: [/\.([cm]?[jt]sx?|json)$/],
    },

    exclude: [...configDefaults.exclude, 'e2e'],
  },
})
