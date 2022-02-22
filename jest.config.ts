import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/app/entry.client.tsx',
    '!<rootDir>/app/entry.server.tsx',
    '!**/node_modules/**',
    '!**/.cache/**',
    '!<rootDir>/api/**',
    '!<rootDir>/public/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true
}

export default config
