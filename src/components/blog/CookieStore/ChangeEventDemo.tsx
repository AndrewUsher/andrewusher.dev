import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ExtendedCookieListItem } from './shared/types'
import Badge from './shared/Badge'

interface EventLogEntry {
  id: string
  type: 'changed' | 'deleted'
  timestamp: Date
  changed?: ExtendedCookieListItem[]
  deleted?: ExtendedCookieListItem[]
}

export default function ChangeEventDemo() {
  const [listening, setListening] = useState(false)
  const [events, setEvents] = useState<EventLogEntry[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  const hasCookieStore = typeof window !== 'undefined' && !!window.cookieStore

  useEffect(() => {
    if (!listening || !hasCookieStore) return

    const handleChange = (e: Event) => {
      const event = e as CookieChangeEvent

      const newEntry: EventLogEntry = {
        id: crypto.randomUUID(),
        type: event.type as 'changed' | 'deleted',
        timestamp: new Date(),
        changed: event.changed as ExtendedCookieListItem[],
        deleted: event.deleted as ExtendedCookieListItem[],
      }

      setEvents((prev) => [newEntry, ...prev].slice(0, 50))
    }

    window.cookieStore.addEventListener('change', handleChange)
    return () => {
      window.cookieStore.removeEventListener('change', handleChange)
    }
  }, [listening, hasCookieStore])

  useEffect(() => {
    if (!hasCookieStore || !logRef.current) return
    logRef.current.scrollTop = 0
  }, [events, hasCookieStore])

  const handleClearLog = () => {
    setEvents([])
  }

  const handleTestAdd = async () => {
    try {
      const timestamp = Date.now()
      await window.cookieStore.set({
        name: `test_cookie_${timestamp}`,
        value: `test_value_${timestamp}`,
      })
    } catch (err) {
      console.error('Failed to add test cookie:', err)
    }
  }

  const handleTestUpdate = async () => {
    try {
      await window.cookieStore.set({
        name: 'test_update',
        value: `updated_${Date.now()}`,
      })
    } catch (err) {
      console.error('Failed to update test cookie:', err)
    }
  }

  const handleTestDelete = async () => {
    try {
      await window.cookieStore.delete('test_update')
    } catch (err) {
      console.error('Failed to delete test cookie:', err)
    }
  }

  if (!('cookieStore' in window)) {
    return (
      <div className="dark:border-red-800 dark:bg-red-900/20 my-8 rounded-lg border border-red-200 bg-red-50 p-6">
        <h3 className="dark:text-red-300 mb-2 text-lg font-bold text-red-900">
          Cookie Store API Not Supported
        </h3>
        <p className="dark:text-red-200 text-sm text-red-800">
          Your browser doesn&apos;t support Cookie Store API. Change events
          won&apos;t be available.
        </p>
      </div>
    )
  }

  return (
    <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <h3 className="dark:text-white mb-2 text-xl font-bold text-slate-900">
          Cookie Change Events
        </h3>
        <p className="dark:text-slate-400 text-sm text-slate-600">
          Subscribe to cookie changes and see real-time updates.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setListening(!listening)}
          className={`rounded px-4 py-2 text-sm font-semibold text-white transition-colors ${
            listening
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>

        <Badge variant={listening ? 'success' : 'info'}>
          {listening ? 'Listening' : 'Not Listening'}
        </Badge>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={handleTestAdd}
          className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-slate-300 dark:hover:bg-neutral-600 rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Add Test Cookie
        </button>
        <button
          onClick={handleTestUpdate}
          className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-slate-300 dark:hover:bg-neutral-600 rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Update Test Cookie
        </button>
        <button
          onClick={handleTestDelete}
          className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-slate-300 dark:hover:bg-neutral-600 rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Delete Test Cookie
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h4 className="dark:text-white font-semibold text-slate-900">
          Event Log ({events.length})
        </h4>
        {events.length > 0 && (
          <button
            onClick={handleClearLog}
            className="dark:text-red-400 dark:hover:text-red-300 text-sm text-red-600 hover:text-red-700"
          >
            Clear Log
          </button>
        )}
      </div>

      <div
        ref={logRef}
        className="dark:border-neutral-700 dark:bg-neutral-900 max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50"
      >
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <div className="dark:text-slate-500 py-8 text-center text-slate-500">
              {listening
                ? 'Listening for cookie changes...'
                : 'Start listening to see cookie change events'}
            </div>
          ) : (
            <div className="dark:divide-neutral-700 divide-y divide-slate-200">
              {events.map((entry) => (
                <div
                  key={entry.id}
                  className="dark:bg-neutral-800 bg-white p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant={entry.type === 'changed' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {entry.type}
                    </Badge>
                    <span className="dark:text-slate-500 text-xs text-slate-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  {entry.changed && entry.changed.length > 0 && (
                    <div className="mb-2">
                      <span className="dark:text-green-400 text-xs font-semibold text-green-700">
                        Added/Modified:
                      </span>
                      <div className="mt-1 space-y-1">
                        {entry.changed.map((cookie) => (
                          <div
                            key={cookie.name}
                            className="dark:border-green-800 dark:bg-green-900/20 rounded border border-green-200 bg-green-50 px-2 py-1 text-sm"
                          >
                            <span className="dark:text-green-300 font-medium text-green-900">
                              {cookie.name}
                            </span>
                            <span className="dark:text-green-400 ml-2 text-green-700">
                              = {cookie.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.deleted && entry.deleted.length > 0 && (
                    <div>
                      <span className="dark:text-red-400 text-xs font-semibold text-red-700">
                        Deleted:
                      </span>
                      <div className="mt-1 space-y-1">
                        {entry.deleted.map((cookie) => (
                          <div
                            key={cookie.name}
                            className="dark:border-red-800 dark:bg-red-900/20 rounded border border-red-200 bg-red-50 px-2 py-1 text-sm"
                          >
                            <span className="dark:text-red-300 font-medium text-red-900">
                              {cookie.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
