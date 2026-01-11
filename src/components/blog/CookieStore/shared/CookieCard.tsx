import { motion } from 'framer-motion'
import Badge from './Badge'
import type { ExtendedCookieListItem } from './types'

interface CookieCardProps {
  cookie: ExtendedCookieListItem
  onDelete: (name: string) => void
  showPartitioned?: boolean
}

export default function CookieCard({
  cookie,
  onDelete,
  showPartitioned = false,
}: CookieCardProps) {
  if (!cookie.name) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="dark:border-neutral-700 dark:bg-neutral-800 flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="dark:text-white truncate font-semibold text-slate-900">
            {cookie.name}
          </h3>
          {cookie.partitioned && showPartitioned && (
            <Badge variant="info" size="sm">
              Partitioned
            </Badge>
          )}
        </div>
        <p className="dark:text-slate-400 truncate text-sm text-slate-600">
          {cookie.value}
        </p>
        <div className="dark:text-slate-500 mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
          {cookie.domain && (
            <span className="dark:bg-neutral-700 rounded bg-slate-100 px-2 py-1">
              Domain: {cookie.domain}
            </span>
          )}
          {cookie.path && (
            <span className="dark:bg-neutral-700 rounded bg-slate-100 px-2 py-1">
              Path: {cookie.path}
            </span>
          )}
          {cookie.expires && (
            <span className="dark:bg-neutral-700 rounded bg-slate-100 px-2 py-1">
              Expires: {new Date(cookie.expires).toLocaleDateString()}
            </span>
          )}
          {cookie.sameSite && (
            <span className="dark:bg-neutral-700 rounded bg-slate-100 px-2 py-1">
              SameSite: {cookie.sameSite}
            </span>
          )}
          {cookie.secure && (
            <Badge variant="success" size="sm">
              Secure
            </Badge>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(cookie.name)}
        className="dark:text-slate-500 dark:hover:text-red-400 text-slate-400 transition-colors hover:text-red-600"
        aria-label={`Delete ${cookie.name}`}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </motion.div>
  )
}
