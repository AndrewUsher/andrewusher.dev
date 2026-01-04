import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-offset-neutral-900 fixed bottom-6
        right-6 flex
        h-12 w-12 items-center
        justify-center rounded-full
        bg-sky-600 text-white
        shadow-lg
        transition-all
        duration-300
        hover:bg-sky-700 focus:outline-none
        focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 md:bottom-8
        md:right-8
        ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
      `}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  )
}
