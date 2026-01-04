import { motion } from 'framer-motion'
import { CodeBracketIcon } from '@heroicons/react/24/solid'
import { CommitTypeBadge } from './CommitTypeBadge'
import {
  type GitHubCommit,
  formatRelativeTime,
  truncateCommitMessage,
  parseCommitType,
} from '../lib/github-commits'

interface RecentCommitsProps {
  commits: GitHubCommit[]
  error?: string | null
}

export function RecentCommits({ commits, error }: RecentCommitsProps) {
  if (error) {
    return <></>
  }

  if (commits.length === 0) {
    return (
      <section>
        <h2 className="dark:text-white mb-8 text-4xl font-bold tracking-tight">
          Recent GitHub Activity
        </h2>
        <p className="dark:text-slate-400 text-slate-700">
          No recent commits found.
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="dark:text-white mb-8 text-4xl font-bold tracking-tight">
        Recent GitHub Activity
      </h2>

      <div className="space-y-4">
        {commits.map((commit, index) => {
          const commitType = parseCommitType(commit.message)

          return (
            <motion.div
              key={commit.sha}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <article className="dark:bg-slate-800/50 dark:border-blue-400/30 group rounded-lg border-l-4 border-blue-400/50 bg-white p-4 shadow-sm transition-all hover:border-sky-500 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <CodeBracketIcon className="dark:text-sky-400 h-6 w-6 flex-shrink-0 text-sky-600" />

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="dark:text-white text-lg font-semibold tracking-wide">
                      <a
                        href={commit.commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dark:hover:text-sky-400 transition-colors hover:text-sky-500"
                      >
                        {truncateCommitMessage(commit.message)}
                      </a>
                    </h3>
                    {commitType && <CommitTypeBadge type={commitType} />}
                  </div>

                  <div className="dark:text-slate-400 flex flex-wrap items-center gap-2 text-sm text-slate-700">
                    <a
                      href={commit.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:hover:text-sky-400 transition-colors hover:text-sky-500"
                    >
                      {commit.repo}
                    </a>
                    <span className="dark:text-slate-600 text-slate-400">
                      •
                    </span>
                    <time dateTime={commit.date.toISOString()}>
                      {formatRelativeTime(commit.date)}
                    </time>
                  </div>
                </div>
              </div>
              </article>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
