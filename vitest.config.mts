/// <reference types="astro/client" />
import { getViteConfig } from 'astro/config'
import { configDefaults } from 'vitest/config'

export default getViteConfig({
  test: {
    environment: 'node',
    globals: true,
    reporters: 'verbose',
    setupFiles: ['./vitest.setup.js'],
    exclude: [...configDefaults.exclude, 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov', 'text'],
      reportsDirectory: './coverage/unit',
      include: ['src/**'],
      exclude: [
        'src/test/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
})
