import { useEffect, useState } from 'react'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'

interface ViewCounterProps {
  slug: string
  title?: string
  date?: string
  tags?: string[]
  readingTime?: string
}

export default function ViewCounter({
  slug,
  title,
  date,
  tags,
  readingTime,
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addPost } = useRecentlyViewed()

  useEffect(() => {
    async function trackAndFetchViews() {
      try {
        // Add to recently viewed if we have the required data
        if (title && date && tags && readingTime) {
          addPost({
            slug,
            title,
            date,
            tags,
            readingTime,
          })
        }
        const incrementResponse = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        })

        if (!incrementResponse.ok) {
          throw new Error('Failed to increment views')
        }

        const data = await incrementResponse.json()
        setViews(data.views)
        setIsLoading(false)
      } catch (err) {
        console.error('Error tracking view:', err)
        setError(true)
        setIsLoading(false)
      }
    }

    trackAndFetchViews()
  }, [slug, title, date, tags, readingTime, addPost])

  if (error) {
    return null
  }

  if (isLoading || views === null) {
    return (
      <span className="dark:text-gray-400 text-sm text-gray-500">
        Loading views...
      </span>
    )
  }

  const formattedViews = views.toLocaleString()

  return (
    <span className="dark:text-gray-400 text-sm text-gray-600">
      {formattedViews} {views === 1 ? 'view' : 'views'}
    </span>
  )
}
