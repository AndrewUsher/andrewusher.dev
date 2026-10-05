import { useEffect, useMemo, useState } from 'react'
import type { GitHubCommit } from '../lib/github-commits'
import { RecentCommits } from './RecentCommits'

interface RecentCommitsWrapperProps {
  commits: GitHubCommit[]
  error?: string | null
}

interface SelectedCommitDay {
  date: string
  count: number
}

export function RecentCommitsWrapper({
  commits,
  error,
}: RecentCommitsWrapperProps) {
  const [selectedDay, setSelectedDay] = useState<SelectedCommitDay | null>(null)

  useEffect(() => {
    const handleSelect = (event: Event) => {
      const detail = (event as CustomEvent<SelectedCommitDay>).detail
      setSelectedDay(detail ?? null)
    }
    const handleClear = () => setSelectedDay(null)

    window.addEventListener('commit-calendar-select', handleSelect)
    window.addEventListener('commit-calendar-clear', handleClear)
    return () => {
      window.removeEventListener('commit-calendar-select', handleSelect)
      window.removeEventListener('commit-calendar-clear', handleClear)
    }
  }, [])

  const visibleCommits = useMemo(
    () =>
      selectedDay
        ? commits.filter((commit) => commit.date.slice(0, 10) === selectedDay.date)
        : commits,
    [commits, selectedDay]
  )

  return (
    <div>
      {selectedDay && (
        <p
          aria-live="polite"
          className="dark:text-slate-300 mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-700"
          role="status"
        >
          <span>
            Showing {selectedDay.date} ({selectedDay.count})
          </span>
          <button
            className="dark:text-sky-400 rounded-sm font-semibold text-sky-700 underline decoration-current underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => window.dispatchEvent(new Event('commit-calendar-clear'))}
            type="button"
          >
            Clear
          </button>
        </p>
      )}
      <RecentCommits commits={visibleCommits} error={error ?? null} />
    </div>
  )
}
