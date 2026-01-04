export type CommitType =
  | 'feat'
  | 'fix'
  | 'chore'
  | 'docs'
  | 'refactor'
  | 'test'
  | 'perf'
  | 'style'
  | 'ci'
  | 'build'

export interface GitHubCommit {
  sha: string
  message: string
  repo: string
  repoUrl: string
  commitUrl: string
  date: Date
}

export interface GitHubCommitsFetchError {
  error: string
  status?: number
}

export interface FetchCommitsOptions {
  maxRepos?: number
  commitsPerRepo?: number
  totalCommitsLimit?: number
}

interface GitHubEvent {
  type: string
  repo: {
    name: string
  }
  created_at: string
}

interface RepositoryInfo {
  name: string
  fork: boolean
  lastActivity: Date
}

/**
 * Discovers active repositories from a user's recent GitHub activity
 * Uses the Events API to find repos with recent commits, excluding forks
 * @param username - GitHub username
 * @param maxRepos - Maximum number of repos to return (default from env or 5)
 * @returns Array of repository names (e.g., ["username/repo1", "username/repo2"])
 */
async function discoverActiveRepos(
  username: string,
  maxRepos?: number
): Promise<string[]> {
  const limit =
    maxRepos ??
    (process.env.GITHUB_MAX_REPOS ? Number(process.env.GITHUB_MAX_REPOS) : 5)

  try {
    // Fetch recent events from the user
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    )

    if (!eventsResponse.ok) {
      console.error(
        `Failed to fetch GitHub events: ${eventsResponse.statusText}`
      )
      return []
    }

    const events: GitHubEvent[] = await eventsResponse.json()

    // Extract repos from PushEvents (indicates commits)
    const repoMap = new Map<string, Date>()
    for (const event of events) {
      if (event.type === 'PushEvent') {
        const repoName = event.repo.name
        const eventDate = new Date(event.created_at)

        // Keep the most recent activity date for each repo
        if (!repoMap.has(repoName) || eventDate > repoMap.get(repoName)!) {
          repoMap.set(repoName, eventDate)
        }
      }
    }

    // Convert to array and sort by most recent activity
    const reposWithActivity = Array.from(repoMap.entries())
      .map(([name, lastActivity]) => ({ name, lastActivity }))
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())

    // Fetch repo details in parallel to check for forks
    const repoDetailsPromises = reposWithActivity
      .slice(0, limit * 2) // Fetch more than needed in case some are forks
      .map(async ({ name }) => {
        try {
          const repoResponse = await fetch(
            `https://api.github.com/repos/${name}`,
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && {
                  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                }),
              },
            }
          )

          if (!repoResponse.ok) {
            return null
          }

          const repoData = await repoResponse.json()
          return {
            name,
            fork: repoData.fork,
            lastActivity:
              repoMap.get(name) ?? new Date(repoData.pushed_at ?? 0),
          }
        } catch {
          return null
        }
      })

    const repoDetails = (await Promise.all(repoDetailsPromises)).filter(
      (repo): repo is RepositoryInfo => repo !== null && !repo.fork
    )

    // Return top N repos
    return repoDetails.slice(0, limit).map((repo) => repo.name)
  } catch (err) {
    console.error(
      'Error discovering active repos:',
      err instanceof Error ? err.message : 'Unknown error'
    )
    return []
  }
}

/**
 * Fetches recent commits from multiple repositories the user has contributed to
 * Automatically discovers active repos and aggregates commits chronologically
 * @param username - GitHub username
 * @param options - Optional configuration for repo limits and commit counts
 * @returns Array of commits sorted by date (empty array on error)
 */
export async function fetchRecentCommits(
  username: string,
  options?: FetchCommitsOptions
): Promise<GitHubCommit[]> {
  const maxRepos =
    options?.maxRepos ??
    (process.env.GITHUB_MAX_REPOS ? Number(process.env.GITHUB_MAX_REPOS) : 5)
  const commitsPerRepo =
    options?.commitsPerRepo ??
    (process.env.GITHUB_COMMITS_PER_REPO
      ? Number(process.env.GITHUB_COMMITS_PER_REPO)
      : 5)
  const totalLimit =
    options?.totalCommitsLimit ??
    (process.env.GITHUB_TOTAL_COMMITS
      ? Number(process.env.GITHUB_TOTAL_COMMITS)
      : 25)

  try {
    // Discover active repositories
    const repos = await discoverActiveRepos(username, maxRepos)

    if (repos.length === 0) {
      console.warn('No active repositories found')
      return []
    }

    // Fetch commits from each repo in parallel
    const commitPromises = repos.map(async (repoFullName) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoFullName}/commits?per_page=${commitsPerRepo}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              ...(process.env.GITHUB_TOKEN && {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              }),
            },
          }
        )

        if (!response.ok) {
          console.error(
            `Failed to fetch commits for ${repoFullName}: ${response.statusText}`
          )
          return []
        }

        const commitsData = await response.json()

        return commitsData.map((commitData: any) => ({
          sha: commitData.sha,
          message: commitData.commit.message,
          repo: repoFullName,
          repoUrl: `https://github.com/${repoFullName}`,
          commitUrl: commitData.html_url,
          date: new Date(commitData.commit.author.date),
        })) as GitHubCommit[]
      } catch (err) {
        console.error(
          `Error fetching commits for ${repoFullName}:`,
          err instanceof Error ? err.message : 'Unknown error'
        )
        return []
      }
    })

    // Wait for all promises to settle (partial failures allowed)
    const results = await Promise.allSettled(commitPromises)

    // Collect all successful commits
    const allCommits: GitHubCommit[] = results
      .filter(
        (result): result is PromiseFulfilledResult<GitHubCommit[]> =>
          result.status === 'fulfilled'
      )
      .flatMap((result) => result.value)

    // Sort by date (most recent first) and apply total limit
    return allCommits
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, totalLimit)
  } catch (err) {
    console.error(
      'Error fetching recent commits:',
      err instanceof Error ? err.message : 'Unknown error'
    )
    return []
  }
}

/**
 * Formats a date as a relative time string (e.g., "2 days ago")
 * @param date - The date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`
}

/**
 * Truncates a commit message to a maximum length
 * @param message - The commit message
 * @param maxLength - Maximum length (default: 80)
 * @returns Truncated message
 */
export function truncateCommitMessage(message: string, maxLength = 80): string {
  // Get first line only
  const firstLine = message?.split('\n')?.[0]?.trim() ?? ''

  if (firstLine.length <= maxLength) {
    return firstLine
  }

  return firstLine.substring(0, maxLength - 3) + '...'
}

/**
 * Parses a commit message to extract the conventional commit type
 * @param message - The commit message
 * @returns The commit type or null if not a conventional commit
 */
export function parseCommitType(message: string): CommitType | null {
  if (!message) return null

  const firstLine = message.split('\n')[0]?.trim()
  if (!firstLine) return null

  const match = firstLine.match(
    /^(feat|fix|chore|docs|refactor|test|perf|style|ci|build)(\(.+?\))?:/
  )

  if (match && match[1]) {
    return match[1] as CommitType
  }

  return null
}
