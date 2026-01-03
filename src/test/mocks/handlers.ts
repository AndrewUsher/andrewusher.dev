import { http, HttpResponse } from 'msw'

export const handlers = [
  // GitHub Events API
  http.get('https://api.github.com/users/:username/events/public', ({ params }) => {
    const { username } = params

    if (username === 'TestUser') {
      return HttpResponse.json([
        {
          type: 'PushEvent',
          repo: { name: 'TestUser/repo1' },
          created_at: '2025-01-03T10:00:00Z',
        },
        {
          type: 'PushEvent',
          repo: { name: 'TestUser/repo2' },
          created_at: '2025-01-02T10:00:00Z',
        },
        {
          type: 'PushEvent',
          repo: { name: 'TestUser/forked-repo' },
          created_at: '2025-01-01T10:00:00Z',
        },
        {
          type: 'IssuesEvent',
          repo: { name: 'TestUser/repo3' },
          created_at: '2025-01-01T09:00:00Z',
        },
      ])
    }

    return HttpResponse.json([])
  }),

  // GitHub Repo Details API
  http.get('https://api.github.com/repos/:owner/:repo', ({ params }) => {
    const { owner, repo } = params
    const repoName = `${owner}/${repo}`

    if (repoName === 'TestUser/repo1') {
      return HttpResponse.json({
        name: 'repo1',
        full_name: 'TestUser/repo1',
        fork: false,
        pushed_at: '2025-01-03T10:00:00Z',
      })
    }

    if (repoName === 'TestUser/repo2') {
      return HttpResponse.json({
        name: 'repo2',
        full_name: 'TestUser/repo2',
        fork: false,
        pushed_at: '2025-01-02T10:00:00Z',
      })
    }

    if (repoName === 'TestUser/forked-repo') {
      return HttpResponse.json({
        name: 'forked-repo',
        full_name: 'TestUser/forked-repo',
        fork: true,
        pushed_at: '2025-01-01T10:00:00Z',
      })
    }

    return HttpResponse.json(
      { message: 'Not Found' },
      { status: 404 }
    )
  }),

  // GitHub Commits API
  http.get('https://api.github.com/repos/:owner/:repo/commits', ({ params, request }) => {
    const { owner, repo } = params
    const repoName = `${owner}/${repo}`
    const url = new URL(request.url)
    const perPage = parseInt(url.searchParams.get('per_page') || '30', 10)

    if (repoName === 'TestUser/repo1') {
      const commits = Array.from({ length: Math.min(perPage, 5) }, (_, i) => ({
        sha: `sha1-${i}`,
        commit: {
          message: `feat: commit ${i + 1} from repo1`,
          author: {
            date: new Date(Date.now() - i * 3600000).toISOString(),
          },
        },
        html_url: `https://github.com/TestUser/repo1/commit/sha1-${i}`,
      }))

      return HttpResponse.json(commits)
    }

    if (repoName === 'TestUser/repo2') {
      const commits = Array.from({ length: Math.min(perPage, 5) }, (_, i) => ({
        sha: `sha2-${i}`,
        commit: {
          message: `fix: commit ${i + 1} from repo2`,
          author: {
            date: new Date(Date.now() - (i + 10) * 3600000).toISOString(),
          },
        },
        html_url: `https://github.com/TestUser/repo2/commit/sha2-${i}`,
      }))

      return HttpResponse.json(commits)
    }

    return HttpResponse.json(
      { message: 'Not Found' },
      { status: 404 }
    )
  }),
]
