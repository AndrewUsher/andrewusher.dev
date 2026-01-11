import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import CookieCard from './shared/CookieCard'
import type { ExtendedCookieListItem } from './shared/types'

export default function CookiePlayground() {
  const [cookies, setCookies] = useState<ExtendedCookieListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newCookie, setNewCookie] = useState({
    name: '',
    value: '',
    expires: '',
  })
  const [filter, setFilter] = useState('')
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const loadCookies = async () => {
    if (!window?.cookieStore) {
      setError('Cookie Store API not supported')
      setLoading(false)
      return
    }

    try {
      const allCookies = await window.cookieStore.getAll()
      setCookies(allCookies as ExtendedCookieListItem[])
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cookies')
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCookies()
    let cleanup: (() => void) | undefined

    if ('cookieStore' in window) {
      const handleChange = () => {
        loadCookies()
      }
      window.cookieStore.addEventListener('change', handleChange)
      cleanup = () => {
        window.cookieStore.removeEventListener('change', handleChange)
      }
    }

    return cleanup
  }, [])

  const handleSetCookie = async (e: React.FormEvent) => {
    e.preventDefault()
    const cookieName = newCookie.name.trim()

    if (!cookieName) {
      setError('Cookie name is required')
      return
    }

    try {
      const options: any = {
        name: cookieName,
        value: newCookie.value,
      }

      if (newCookie.expires) {
        options.expires = new Date(newCookie.expires).getTime()
      }

      await window.cookieStore.set(options)
      setNewCookie({ name: '', value: '', expires: '' })
      setError(null)
      await loadCookies()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set cookie')
    }
  }

  const handleDeleteCookie = async (name: string) => {
    try {
      await window.cookieStore.delete(name)
      await loadCookies()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete cookie')
    }
  }

  const handleClearAll = async () => {
    if (!showConfirmDeleteModal) {
      setShowConfirmDeleteModal(true)
      return
    }

    setShowConfirmDeleteModal(false)

    const demoCookies = cookies.filter((cookie) =>
      cookie.name?.startsWith('demo_')
    )

    if (demoCookies.length === 0) {
      setError('No demo cookies found')
      return
    }

    try {
      await Promise.all(
        demoCookies.map((cookie) => window.cookieStore.delete(cookie.name))
      )
      await loadCookies()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to clear demo cookies'
      )
    }
  }

  const filteredCookies = cookies.filter((c) =>
    c.name?.toLowerCase().includes(filter.toLowerCase())
  )

  if (!('cookieStore' in window)) {
    return (
      <div className="dark:border-red-800 dark:bg-red-900/20 my-8 rounded-lg border border-red-200 bg-red-50 p-6">
        <h3 className="dark:text-red-300 mb-2 text-lg font-bold text-red-900">
          Cookie Store API Not Supported
        </h3>
        <p className="dark:text-red-200 text-sm text-red-800">
          Your browser doesn&apos;t support the Cookie Store API. Please use a
          modern browser like Chrome 87+, Firefox 140+, Safari 18.4+, or Edge
          87+.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
        <p className="dark:text-slate-400 text-center text-slate-600">
          Loading cookies...
        </p>
      </div>
    )
  }

  return (
    <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <h3 className="dark:text-white mb-2 text-xl font-bold text-slate-900">
          Cookie Playground
        </h3>
        <p className="dark:text-slate-400 text-sm text-slate-600">
          Create, read, and delete cookies directly from your browser.
        </p>
      </div>

      {error && (
        <div className="dark:border-red-800 dark:bg-red-900/20 mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="dark:text-red-200 text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter cookies..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-500 w-full rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500"
          />
        </div>
        <div className="dark:text-slate-400 text-sm text-slate-600">
          {cookies.length} cookies
        </div>
      </div>

      <form
        onSubmit={handleSetCookie}
        className="dark:border-neutral-700 dark:bg-neutral-900 mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4"
      >
        <h4 className="dark:text-white mb-3 font-semibold text-slate-900">
          Add New Cookie
        </h4>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="cookie-name"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="cookie-name"
              type="text"
              value={newCookie.name}
              onChange={(e) =>
                setNewCookie({ ...newCookie, name: e.target.value })
              }
              placeholder="my_cookie"
              className="dark:border-neutral-600 dark:bg-neutral-800 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cookie-value"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Value
            </label>
            <input
              id="cookie-value"
              type="text"
              value={newCookie.value}
              onChange={(e) =>
                setNewCookie({ ...newCookie, value: e.target.value })
              }
              placeholder="Cookie value"
              className="dark:border-neutral-600 dark:bg-neutral-800 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cookie-expires"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Expires (optional)
            </label>
            <input
              id="cookie-expires"
              type="datetime-local"
              value={newCookie.expires}
              onChange={(e) =>
                setNewCookie({ ...newCookie, expires: e.target.value })
              }
              className="dark:border-neutral-600 dark:bg-neutral-800 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
        >
          Set Cookie
        </button>
      </form>

      {cookies.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowConfirmDeleteModal(true)}
            className="dark:text-red-400 dark:hover:text-red-300 text-sm text-red-600 hover:text-red-700"
          >
            Clear Demo Cookies
          </button>
        </div>
      )}

      {showConfirmDeleteModal && (
        <div className="dark:border-neutral-700 dark:bg-neutral-800 mb-4 rounded-lg border border-slate-200 bg-white p-4">
          <p className="dark:text-slate-300 mb-3 text-sm text-slate-700">
            Delete all demo cookies (cookies starting with &apos;demo_&apos;)?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirmDeleteModal(false)}
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-slate-300 dark:hover:bg-neutral-600 rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleClearAll}
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {filteredCookies.length === 0 ? (
          <div className="dark:text-slate-500 py-8 text-center text-slate-500">
            No cookies found. Try creating one above!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCookies.map((cookie) => (
              <CookieCard
                key={cookie.name}
                cookie={cookie}
                onDelete={handleDeleteCookie}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
