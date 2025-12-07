import { useEffect, useState } from 'react'

/**
 * React Hook to get the scroll percentage from the page, returns value from 0 to 100
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0)
  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentScrollingProgress = window.scrollY
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight

      if (totalScrollHeight) {
        setCompletion(
          Number((currentScrollingProgress / totalScrollHeight).toFixed(2)) *
            100
        )
      }
    }

    window.addEventListener('scroll', updateScrollCompletion)

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion)
    }
  }, [])
  return completion
}

export function ReadingProgressBar() {
  const completion = useReadingProgress()
  return (
    <span
      id="progress-bar"
      style={{
        transform: `translateX(${completion - 100}%)`,
      }}
      className={
        'fixed bottom-0 h-1 w-full bg-sky-600 transition-transform duration-150'
      }
    />
  )
}
