import { useState, useEffect, useRef, useCallback } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TAG_COLORS } from '../lib/tagColors'

declare global {
  interface Window {
    // eslint-disable-next-line
    // @ts-ignore - Pagefind is loaded dynamically at runtime
    __pagefind__?: any
  }
}

interface PagefindResult {
  id: string
  data: () => Promise<{
    url: string
    content: string
    meta: {
      title: string
      image?: string
    }
    word_count: number
    filters: {
      tags?: string[]
    }
    excerpt: string
  }>
}

interface PagefindAPI {
  search: (
    query: string,
    options?: { filters?: Record<string, string[]> }
  ) => Promise<{
    results: PagefindResult[]
    filters: Record<string, Record<string, number>>
  }>
  init: () => Promise<void>
}

interface SearchResult {
  url: string
  title: string
  excerpt: string
  tags?: string[]
}

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [availableTags, setAvailableTags] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [pagefind, setPagefind] = useState<PagefindAPI | null>(null)

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadPagefind = async () => {
      try {
        console.log('Loading Pagefind...')

        // Use a dynamic import wrapped in an inline script module
        const inlineScript = document.createElement('script')
        inlineScript.type = 'module'
        inlineScript.textContent = `
          import * as pagefind from '/pagefind/pagefind.js';
          window.__pagefind__ = pagefind;
          window.dispatchEvent(new CustomEvent('pagefindLoaded'));
        `

        document.head.appendChild(inlineScript)

        // Wait for the custom event
        await new Promise((resolve) => {
          window.addEventListener('pagefindLoaded', resolve, { once: true })
        })

        // @ts-ignore
        if (window.__pagefind__) {
          console.log('Pagefind loaded successfully')
          // @ts-ignore
          setPagefind(window.__pagefind__)
        } else {
          console.error('Pagefind module not found on window after loading')
        }
      } catch (error) {
        console.error('Failed to load Pagefind:', error)
      }
    }

    loadPagefind()
  }, [])

  const performSearch = useCallback(
    async (searchQuery: string, tagFilter: string | null) => {
      if (!pagefind || !searchQuery.trim()) {
        setResults([])
        setAvailableTags({})
        return
      }

      setIsLoading(true)
      try {
        const searchOptions: any = {}
        if (tagFilter) {
          searchOptions.filters = { tags: [tagFilter] }
        }

        const response = await pagefind.search(searchQuery, searchOptions)
        console.log('Pagefind search response:', response)

        if (!response || !response.results) {
          console.error('Invalid search response:', response)
          setResults([])
          setAvailableTags({})
          return
        }

        const processedResults = await Promise.all(
          response.results.slice(0, 10).map(async (result) => {
            const data = await result.data()
            console.log('Result data:', data)
            return {
              url: data.url,
              title: data.meta?.title || 'Untitled',
              excerpt: data.excerpt || '',
              tags: data.filters?.tags || [],
            }
          })
        )

        setResults(processedResults)
        // Pagefind returns filters in response.filters
        const allTags = response.filters?.tags || {}
        setAvailableTags(allTags)
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Search error:', error)
        console.error('Error details:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [pagefind]
  )

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      performSearch(query, selectedTag)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, selectedTag, performSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
        inputRef.current?.focus()
      }

      if (event.key === 'Escape') {
        setIsOpen(false)
      }

      if (isOpen && results.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          )
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        } else if (event.key === 'Enter' && selectedIndex >= 0) {
          event.preventDefault()
          const selectedResult = results[selectedIndex]
          if (selectedResult) {
            window.location.href = selectedResult.url
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex])

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setSelectedTag(null)
  }

  const getTagColor = (tagSlug: string): string => {
    return (
      TAG_COLORS[tagSlug] ||
      'bg-slate-500/20 text-slate-800 dark:text-slate-200 hover:bg-slate-500/30'
    )
  }

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={handleOpen}
        className="dark:text-white dark:hover:bg-neutral-800 flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-slate-100 lg:text-xl"
        aria-label="Search blog posts"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="hidden lg:inline">Search</span>
      </button>

      {isOpen && (
        <>
          <div
            className="dark:bg-black/40 fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={handleClose}
          />

          <div
            className={`
            dark:bg-neutral-900 lg:dark:border-neutral-700
            fixed left-0 top-0
            z-50 flex
            h-full
            w-full flex-col
            overflow-hidden bg-white lg:absolute
            lg:left-auto lg:right-0
            lg:top-full lg:mt-2 lg:h-auto lg:max-h-[80vh] lg:w-[600px] lg:rounded-lg
            lg:border
            lg:border-slate-200 lg:shadow-2xl
          `}
          >
            <div className="dark:border-neutral-700 border-b border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blog posts..."
                  className="dark:text-white flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
                />
                <button
                  onClick={handleClose}
                  className="dark:hover:bg-neutral-800 rounded p-1 hover:bg-slate-100"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {Object.keys(availableTags).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="dark:bg-neutral-700 dark:text-slate-200 rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-700"
                    >
                      Clear filter
                    </button>
                  )}
                  {Object.entries(availableTags)
                    .slice(0, 8)
                    .map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? null : tag)
                        }
                        className={`rounded-md px-2 py-1 text-xs transition-colors ${
                          selectedTag === tag ? 'ring-2 ring-blue-500' : ''
                        } ${getTagColor(tag)}`}
                      >
                        {tag} ({count})
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading && (
                <div className="dark:text-slate-400 p-8 text-center text-slate-500">
                  Searching...
                </div>
              )}

              {!isLoading && query && results.length === 0 && (
                <div className="dark:text-slate-400 p-8 text-center text-slate-500">
                  No results found
                </div>
              )}

              {!query && !isLoading && (
                <div className="dark:text-slate-400 p-8 text-center text-slate-500">
                  Start typing to search blog posts...
                  <div className="mt-4 text-sm">
                    Press{' '}
                    <kbd className="dark:bg-neutral-800 rounded bg-slate-100 px-2 py-1">
                      ⌘K
                    </kbd>{' '}
                    or{' '}
                    <kbd className="dark:bg-neutral-800 rounded bg-slate-100 px-2 py-1">
                      Ctrl+K
                    </kbd>{' '}
                    to open
                  </div>
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="dark:divide-neutral-700 divide-y divide-slate-200">
                  {results.map((result, index) => (
                    <a
                      key={result.url}
                      href={result.url}
                      className={`dark:hover:bg-neutral-800 block p-4 transition-colors hover:bg-slate-50 ${
                        index === selectedIndex
                          ? 'dark:bg-neutral-800 bg-slate-50'
                          : ''
                      }`}
                    >
                      <h3 className="dark:text-white mb-1 font-semibold text-slate-900">
                        {result.title}
                      </h3>
                      <p className="dark:text-slate-400 line-clamp-2 text-sm text-slate-600">
                        {result.excerpt}
                      </p>
                      {result.tags && result.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className={`rounded px-2 py-0.5 text-xs ${getTagColor(
                                tag
                              )}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {results.length > 0 && (
              <div className="dark:border-neutral-700 dark:text-slate-400 border-t border-slate-200 p-2 text-center text-xs text-slate-500">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
