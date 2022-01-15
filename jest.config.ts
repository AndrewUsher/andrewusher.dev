import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/.cache/**',
    '!<rootDir>/api/**',
    '!<rootDir>/public/**'
  ],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true
}

export default config
