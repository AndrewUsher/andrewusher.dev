import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: 'verbose',
    setupFiles: ['./vitest.setup.js'],
    transformMode: {
      web: [/\.([cm]?[jt]sx?|json)$/]
    }
  }
})
