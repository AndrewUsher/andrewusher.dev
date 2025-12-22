import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { RecentlyViewedCard } from './RecentlyViewedCard'

interface Props {
  currentSlug?: string
}

export function RecentlyViewedPosts({ currentSlug }: Props) {
  const { getRecentPosts } = useRecentlyViewed()
  const posts = getRecentPosts(currentSlug)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="dark:text-white mb-6 text-3xl font-bold tracking-tight">
        You Recently Read
      </h2>
      <div className="space-y-0">
        {posts.map((post) => (
          <RecentlyViewedCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
