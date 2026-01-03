import { describe, test, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../test/mocks/server'
import {
  fetchRecentCommits,
  formatRelativeTime,
  truncateCommitMessage,
  parseCommitType,
  type CommitType,
} from './github-commits'

describe('github-commits', () => {
  describe('fetchRecentCommits', () => {
    test('fetches commits from multiple repositories', async () => {
      const commits = await fetchRecentCommits('TestUser')

      expect(commits).toBeInstanceOf(Array)
      expect(commits.length).toBeGreaterThan(0)
      expect(commits.length).toBeLessThanOrEqual(25)

      const commit = commits[0]
      expect(commit).toHaveProperty('sha')
      expect(commit).toHaveProperty('message')
      expect(commit).toHaveProperty('repo')
      expect(commit).toHaveProperty('repoUrl')
      expect(commit).toHaveProperty('commitUrl')
      expect(commit).toHaveProperty('date')
      expect(commit.date).toBeInstanceOf(Date)
    })

    test('excludes forked repositories', async () => {
      const commits = await fetchRecentCommits('TestUser')

      const forkedRepoCommits = commits.filter((commit) =>
        commit.repo.includes('forked-repo')
      )

      expect(forkedRepoCommits).toHaveLength(0)
    })

    test('sorts commits chronologically by date', async () => {
      const commits = await fetchRecentCommits('TestUser')

      for (let i = 0; i < commits.length - 1; i++) {
        expect(commits[i].date.getTime()).toBeGreaterThanOrEqual(
          commits[i + 1].date.getTime()
        )
      }
    })

    test('respects maxRepos option', async () => {
      const commits = await fetchRecentCommits('TestUser', {
        maxRepos: 1,
        commitsPerRepo: 5,
      })

      const uniqueRepos = new Set(commits.map((c) => c.repo))
      expect(uniqueRepos.size).toBeLessThanOrEqual(1)
    })

    test('respects commitsPerRepo option', async () => {
      const commits = await fetchRecentCommits('TestUser', {
        maxRepos: 2,
        commitsPerRepo: 2,
      })

      expect(commits.length).toBeLessThanOrEqual(4)
    })

    test('respects totalCommitsLimit option', async () => {
      const commits = await fetchRecentCommits('TestUser', {
        totalCommitsLimit: 3,
      })

      expect(commits.length).toBeLessThanOrEqual(3)
    })

    test('returns empty array when no repositories found', async () => {
      server.use(
        http.get(
          'https://api.github.com/users/:username/events/public',
          () => {
            return HttpResponse.json([])
          }
        )
      )

      const commits = await fetchRecentCommits('EmptyUser')

      expect(commits).toEqual([])
    })

    test('returns empty array when events API fails', async () => {
      server.use(
        http.get(
          'https://api.github.com/users/:username/events/public',
          () => {
            return HttpResponse.json(
              { message: 'API rate limit exceeded' },
              { status: 403 }
            )
          }
        )
      )

      const commits = await fetchRecentCommits('ErrorUser')

      expect(commits).toEqual([])
    })

    test('handles partial failures gracefully', async () => {
      server.use(
        http.get('https://api.github.com/repos/TestUser/repo2/commits', () => {
          return HttpResponse.json(
            { message: 'Server Error' },
            { status: 500 }
          )
        })
      )

      const commits = await fetchRecentCommits('TestUser')

      expect(commits).toBeInstanceOf(Array)
      const repo2Commits = commits.filter((c) => c.repo === 'TestUser/repo2')
      expect(repo2Commits).toHaveLength(0)
    })

    test('uses environment variables for default limits', async () => {
      const originalMaxRepos = process.env.GITHUB_MAX_REPOS
      const originalCommitsPerRepo = process.env.GITHUB_COMMITS_PER_REPO
      const originalTotalCommits = process.env.GITHUB_TOTAL_COMMITS

      process.env.GITHUB_MAX_REPOS = '2'
      process.env.GITHUB_COMMITS_PER_REPO = '3'
      process.env.GITHUB_TOTAL_COMMITS = '5'

      const commits = await fetchRecentCommits('TestUser')

      expect(commits.length).toBeLessThanOrEqual(5)

      // Restore or delete env vars
      if (originalMaxRepos === undefined) {
        delete process.env.GITHUB_MAX_REPOS
      } else {
        process.env.GITHUB_MAX_REPOS = originalMaxRepos
      }

      if (originalCommitsPerRepo === undefined) {
        delete process.env.GITHUB_COMMITS_PER_REPO
      } else {
        process.env.GITHUB_COMMITS_PER_REPO = originalCommitsPerRepo
      }

      if (originalTotalCommits === undefined) {
        delete process.env.GITHUB_TOTAL_COMMITS
      } else {
        process.env.GITHUB_TOTAL_COMMITS = originalTotalCommits
      }
    })

    test('commit objects have correct structure', async () => {
      const commits = await fetchRecentCommits('TestUser', { maxRepos: 1 })

      const commit = commits[0]

      expect(typeof commit.sha).toBe('string')
      expect(typeof commit.message).toBe('string')
      expect(typeof commit.repo).toBe('string')
      expect(typeof commit.repoUrl).toBe('string')
      expect(typeof commit.commitUrl).toBe('string')
      expect(commit.repoUrl).toMatch(/^https:\/\/github\.com\//)
      expect(commit.commitUrl).toMatch(/^https:\/\/github\.com\/.*\/commit\//)
    })
  })

  describe('formatRelativeTime', () => {
    test('returns "just now" for recent times', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('just now')

      const fewSecondsAgo = new Date(Date.now() - 30 * 1000)
      expect(formatRelativeTime(fewSecondsAgo)).toBe('just now')
    })

    test('formats minutes correctly', () => {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
      expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago')

      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago')
    })

    test('formats hours correctly', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago')

      const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000)
      expect(formatRelativeTime(fiveHoursAgo)).toBe('5 hours ago')
    })

    test('formats days correctly', () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago')

      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago')
    })

    test('formats weeks correctly', () => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(oneWeekAgo)).toBe('1 week ago')

      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(twoWeeksAgo)).toBe('2 weeks ago')
    })

    test('formats months correctly', () => {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(oneMonthAgo)).toBe('1 month ago')

      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(threeMonthsAgo)).toBe('3 months ago')
    })

    test('formats years correctly', () => {
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(oneYearAgo)).toBe('1 year ago')

      const twoYearsAgo = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(twoYearsAgo)).toBe('2 years ago')
    })
  })

  describe('truncateCommitMessage', () => {
    test('returns message as-is if shorter than max length', () => {
      const message = 'Short message'
      expect(truncateCommitMessage(message)).toBe('Short message')
    })

    test('truncates message at max length', () => {
      const message = 'a'.repeat(100)
      const truncated = truncateCommitMessage(message, 80)

      expect(truncated.length).toBe(80)
      expect(truncated.endsWith('...')).toBe(true)
    })

    test('uses default max length of 80', () => {
      const message = 'a'.repeat(100)
      const truncated = truncateCommitMessage(message)

      expect(truncated.length).toBe(80)
    })

    test('extracts only first line of multi-line message', () => {
      const message = 'First line\nSecond line\nThird line'
      expect(truncateCommitMessage(message)).toBe('First line')
    })

    test('handles empty messages', () => {
      expect(truncateCommitMessage('')).toBe('')
      expect(truncateCommitMessage(undefined as any)).toBe('')
    })

    test('trims whitespace', () => {
      const message = '  Indented message  \n'
      expect(truncateCommitMessage(message)).toBe('Indented message')
    })
  })

  describe('parseCommitType', () => {
    test('parses feat commits', () => {
      expect(parseCommitType('feat: add new feature')).toBe('feat')
      expect(parseCommitType('feat(scope): add new feature')).toBe('feat')
    })

    test('parses fix commits', () => {
      expect(parseCommitType('fix: resolve bug')).toBe('fix')
      expect(parseCommitType('fix(auth): resolve login issue')).toBe('fix')
    })

    test('parses all commit types', () => {
      const types: CommitType[] = [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'test',
        'perf',
        'style',
        'ci',
        'build',
      ]

      types.forEach((type) => {
        expect(parseCommitType(`${type}: message`)).toBe(type)
        expect(parseCommitType(`${type}(scope): message`)).toBe(type)
      })
    })

    test('returns null for non-conventional commits', () => {
      expect(parseCommitType('Add new feature')).toBeNull()
      expect(parseCommitType('Update documentation')).toBeNull()
      expect(parseCommitType('random commit message')).toBeNull()
    })

    test('returns null for empty messages', () => {
      expect(parseCommitType('')).toBeNull()
      expect(parseCommitType(null as any)).toBeNull()
      expect(parseCommitType(undefined as any)).toBeNull()
    })

    test('handles multi-line messages', () => {
      const message = 'feat: add feature\n\nDetailed description'
      expect(parseCommitType(message)).toBe('feat')
    })

    test('handles scopes with special characters', () => {
      expect(parseCommitType('feat(api/v2): add endpoint')).toBe('feat')
      expect(parseCommitType('fix(UI-123): fix button')).toBe('fix')
    })
  })
})
