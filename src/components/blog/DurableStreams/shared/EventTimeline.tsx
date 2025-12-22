import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EventTimelineProps } from '../types'

const eventColors = {
  connect:
    'bg-green-500/20 border-green-500 text-green-700 dark:text-green-300',
  message: 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300',
  disconnect:
    'bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-300',
  hibernate: 'bg-gray-500/20 border-gray-500 text-gray-700 dark:text-gray-300',
  resume:
    'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300',
  error: 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300',
}

const eventIcons = {
  connect: '🔌',
  message: '📨',
  disconnect: '🔌',
  hibernate: '💤',
  resume: '⚡',
  error: '❌',
}

export function EventTimeline({
  events,
  maxEvents = 50,
  height = 400,
}: EventTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events])

  const displayEvents = events.slice(-maxEvents)

  return (
    <div
      ref={scrollRef}
      className="dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4"
      style={{ height }}
      role="log"
      aria-live="polite"
      aria-label="Event timeline"
    >
      {displayEvents.length === 0 ? (
        <div className="dark:text-slate-500 py-8 text-center text-slate-400">
          No events yet. Interactions will appear here.
        </div>
      ) : (
        <AnimatePresence initial={false}>
          <div className="space-y-2">
            {displayEvents.map((event, index) => {
              const colorClass = eventColors[event.type]
              const icon = eventIcons[event.type]

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className={`border-l-4 ${colorClass} rounded-r px-3 py-2`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="text-lg leading-none"
                      role="img"
                      aria-label={event.type}
                    >
                      {icon}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          {event.type}
                        </span>
                        {event.clientId && (
                          <span className="text-xs opacity-75">
                            {event.clientId}
                          </span>
                        )}
                      </div>

                      {event.message && (
                        <p className="mt-1 text-sm opacity-90">
                          {event.message}
                        </p>
                      )}

                      {event.data && (
                        <pre className="mt-1 overflow-hidden text-xs opacity-75">
                          {typeof event.data === 'object'
                            ? JSON.stringify(event.data, null, 2).slice(0, 100)
                            : String(event.data).slice(0, 100)}
                        </pre>
                      )}
                    </div>

                    <time
                      className="whitespace-nowrap text-xs opacity-50"
                      dateTime={new Date(event.timestamp).toISOString()}
                    >
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}
