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

/**
 * Fetches recent commits from GitHub using a specific repository
 * @param username - GitHub username
 * @param repo - Repository name
 * @param limit - Maximum number of commits to return
 * @returns Array of commits or error object
 */
export async function fetchRecentCommits(
  username: string,
  limit = 10,
  repo = 'andrewusher.dev'
): Promise<GitHubCommit[] | GitHubCommitsFetchError> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=${limit}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          // Add GitHub token if available for higher rate limits
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    )

    if (!response.ok) {
      return {
        error: `Failed to fetch GitHub commits: ${response.statusText}`,
        status: response.status,
      }
    }

    const commitsData = await response.json()

    const commits: GitHubCommit[] = commitsData.map((commitData: any) => ({
      sha: commitData.sha,
      message: commitData.commit.message,
      repo: `${username}/${repo}`,
      repoUrl: `https://github.com/${username}/${repo}`,
      commitUrl: commitData.html_url,
      date: new Date(commitData.commit.author.date),
    }))

    return commits
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Unknown error fetching GitHub commits',
    }
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
