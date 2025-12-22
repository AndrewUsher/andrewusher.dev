import dayjs from 'dayjs'
import { formatRelativeTime } from '../lib/formatRelativeTime'
import type { RecentlyViewedPost } from '../hooks/useRecentlyViewed'

interface Props {
  post: RecentlyViewedPost
}

export function RecentlyViewedCard({ post }: Props) {
  const relativeTime = formatRelativeTime(post.viewedAt)

  return (
    <article className="dark:bg-slate-800/30 dark:hover:bg-slate-800/50 group mb-4 rounded-lg border-l-4 border-sky-500/50 bg-slate-50/50 p-4 transition-all hover:border-sky-500 hover:bg-slate-100/70">
      <h3 className="dark:text-white mb-2 text-lg font-semibold tracking-tight">
        <a
          href={`/blog/${post.slug}`}
          className="transition-colors hover:text-sky-500"
        >
          {post.title}
        </a>
      </h3>

      <div className="dark:text-slate-400 flex flex-col gap-1 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-sky-500/70"
            aria-hidden="true"
          >
            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="dark:text-sky-400 text-xs font-medium text-sky-600">
            Viewed {relativeTime}
          </span>
        </div>

        <time
          dateTime={dayjs(post.date).format('YYYY-MM-DD')}
          className="text-xs"
        >
          Published {dayjs(post.date).format('MMMM DD, YYYY')}
        </time>

        {post.readingTime && (
          <span className="text-xs">{post.readingTime}</span>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="dark:bg-slate-700/50 dark:text-slate-300 rounded-full bg-slate-200/60 px-2 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
