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

interface CommitTypeBadgeProps {
  type: CommitType
}

const commitTypeConfig: Record<
  CommitType,
  { label: string; className: string }
> = {
  feat: {
    label: 'feature',
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  fix: {
    label: 'fix',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  chore: {
    label: 'chore',
    className:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  },
  docs: {
    label: 'docs',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  refactor: {
    label: 'refactor',
    className:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  test: {
    label: 'test',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  perf: {
    label: 'perf',
    className:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  },
  style: {
    label: 'style',
    className:
      'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  },
  ci: {
    label: 'ci',
    className:
      'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  },
  build: {
    label: 'build',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
}

export function CommitTypeBadge({ type }: CommitTypeBadgeProps) {
  const config = commitTypeConfig[type]

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
