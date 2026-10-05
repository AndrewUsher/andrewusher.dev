import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { CommitCalendar as CommitCalendarData } from '../lib/github-commits'

interface CommitCalendarProps {
  username: string
  initialCalendar: CommitCalendarData | null
}

interface CalendarCell {
  date: string
  count: number
  inRange: boolean
  week: number
  weekday: number
}

const CELL_SIZE = 12
const CELL_GAP = 4
const CELL_STEP = CELL_SIZE + CELL_GAP
const WEEKDAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']
const numberFormatter = new Intl.NumberFormat('en')
const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatCount(count: number): string {
  return `${numberFormatter.format(count)} ${count === 1 ? 'commit' : 'commits'}`
}

function getLevel(count: number, max: number): number {
  if (count === 0) return 0
  if (max <= 1) return 4
  return Math.min(4, Math.ceil((count / max) * 4))
}

function makeCells(calendar: CommitCalendarData): CalendarCell[] {
  const start = new Date(`${calendar.range.start}T00:00:00Z`)
  const end = new Date(`${calendar.range.end}T00:00:00Z`)
  const first = new Date(start)
  first.setUTCDate(first.getUTCDate() - ((first.getUTCDay() + 6) % 7))
  const last = new Date(end)
  last.setUTCDate(last.getUTCDate() + ((7 - last.getUTCDay()) % 7))

  const cells: CalendarCell[] = []
  for (const date = new Date(first); date <= last; date.setUTCDate(date.getUTCDate() + 1)) {
    const key = date.toISOString().slice(0, 10)
    const offset = Math.floor((date.getTime() - first.getTime()) / 86_400_000)
    cells.push({
      date: key,
      count: calendar.days[key] ?? 0,
      inRange: key >= calendar.range.start && key <= calendar.range.end,
      week: Math.floor(offset / 7),
      weekday: (date.getUTCDay() + 6) % 7,
    })
  }
  return cells
}

function makeMonthLabels(cells: CalendarCell[]): { label: string; week: number }[] {
  const labels: { label: string; week: number }[] = []
  let previousMonth = -1

  for (const cell of cells) {
    if (!cell.inRange) continue
    const date = new Date(`${cell.date}T00:00:00Z`)
    const month = date.getUTCMonth()
    if (month !== previousMonth) {
      labels.push({
        label: new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(date),
        week: cell.week,
      })
      previousMonth = month
    }
  }

  return labels
}

export default function CommitCalendar({
  username,
  initialCalendar,
}: CommitCalendarProps) {
  const [calendar, setCalendar] = useState<CommitCalendarData | null>(
    initialCalendar
  )
  const [loading, setLoading] = useState(initialCalendar === null)
  const [activeCell, setActiveCell] = useState<CalendarCell | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const cellRefs = useRef(new Map<string, SVGRectElement>())

  useEffect(() => {
    const controller = new AbortController()
    if (initialCalendar === null) {
      fetch(`/api/commits/calendar?username=${encodeURIComponent(username)}`, {
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error('Commit calendar unavailable')
          return (await response.json()) as CommitCalendarData
        })
        .then(setCalendar)
        .catch((error: unknown) => {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Unable to load commit calendar:', error.message)
          }
        })
        .finally(() => setLoading(false))
    }

    const handleClear = () => setSelectedDate(null)
    window.addEventListener('commit-calendar-clear', handleClear)
    return () => {
      controller.abort()
      window.removeEventListener('commit-calendar-clear', handleClear)
    }
  }, [username, initialCalendar])

  const cells = useMemo(() => (calendar ? makeCells(calendar) : []), [calendar])
  const monthLabels = useMemo(
    () =>
      calendar ? makeMonthLabels(cells) : [],
    [calendar, cells]
  )
  const lastCell = cells[cells.length - 1]
  const weekCount = lastCell ? lastCell.week + 1 : 0
  const maxCount = Math.max(0, ...cells.map((cell) => cell.count))
  const firstInRange = cells.find((cell) => cell.inRange)?.date
  const chartLabel = calendar
    ? `Commit activity: ${numberFormatter.format(calendar.total)} total commits from ${calendar.range.start} through ${calendar.range.end}`
    : 'Commit activity calendar'

  function selectCell(cell: CalendarCell) {
    setSelectedDate(cell.date)
    window.dispatchEvent(
      new CustomEvent('commit-calendar-select', {
        detail: { date: cell.date, count: cell.count },
      })
    )
  }

  function handleCellKeyDown(
    event: KeyboardEvent<SVGRectElement>,
    cell: CalendarCell
  ) {
    if (event.key === 'Escape') {
      window.dispatchEvent(new Event('commit-calendar-clear'))
      setSelectedDate(null)
      setActiveCell(null)
      event.currentTarget.blur()
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectCell(cell)
      return
    }

    const dayOffset = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    }[event.key]
    if (dayOffset === undefined) return

    event.preventDefault()
    const nextDate = new Date(`${cell.date}T00:00:00Z`)
    nextDate.setUTCDate(nextDate.getUTCDate() + dayOffset)
    const nextKey = nextDate.toISOString().slice(0, 10)
    if (cells.some((item) => item.date === nextKey && item.inRange)) {
      cellRefs.current.get(nextKey)?.focus()
    }
  }

  if (!loading && !calendar) return null

  return (
    <section
      aria-busy={loading}
      aria-label={chartLabel}
      className="commit-calendar rounded-xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/60 sm:p-6"
      role="group"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="dark:text-white text-lg font-semibold tracking-tight text-slate-900">
          Commit activity
        </h2>
        {calendar && (
          <p className="dark:text-slate-300 text-sm text-slate-600">
            <span className="dark:text-white font-semibold text-slate-900">
              {numberFormatter.format(calendar.total)}
            </span>{' '}
            commits in the last year
          </p>
        )}
      </div>

      {loading ? (
        <div aria-label="Loading commit activity" className="overflow-x-auto pb-2" role="status">
          <div
            aria-hidden="true"
            className="commit-calendar-skeleton-grid grid h-28 w-max grid-flow-col grid-rows-7 gap-1"
          >
            {Array.from({ length: 53 * 7 }, (_, index) => (
              <span className="commit-calendar-skeleton-cell" key={index} />
            ))}
          </div>
        </div>
      ) : calendar && calendar.total === 0 ? (
        <p className="dark:text-slate-300 py-10 text-center text-sm text-slate-600">
          No commits in the last year
        </p>
      ) : calendar ? (
        <>
          <div className="overflow-x-auto pb-2">
            <div className="relative" style={{ width: weekCount * CELL_STEP + 36 }}>
              <div
                aria-hidden="true"
                className="commit-calendar-months sticky top-0 z-10 h-6"
                style={{ width: weekCount * CELL_STEP + 36 }}
              >
                {monthLabels.map(({ label, week }) => (
                  <span
                    className="dark:text-slate-400 absolute top-0 text-xs text-slate-500"
                    key={`${label}-${week}`}
                    style={{ left: 36 + week * CELL_STEP }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex items-start gap-2">
                <div aria-hidden="true" className="grid h-28 w-7 grid-rows-7">
                  {WEEKDAY_LABELS.map((label, index) => (
                    <span
                      className="dark:text-slate-500 h-4 text-[10px] leading-4 text-slate-400"
                      key={`${label}-${index}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <svg
                    aria-label={chartLabel}
                    className="block overflow-visible"
                    height={7 * CELL_STEP}
                    role="group"
                    viewBox={`0 0 ${weekCount * CELL_STEP} ${7 * CELL_STEP}`}
                    width={weekCount * CELL_STEP}
                  >
                    {cells.map((cell) => {
                      const tabIndex =
                        selectedDate === cell.date ||
                        (!selectedDate && firstInRange === cell.date)
                          ? 0
                          : -1
                      return (
                        <rect
                          aria-hidden={!cell.inRange}
                          aria-label={`${dateFormatter.format(new Date(`${cell.date}T00:00:00Z`))}: ${formatCount(cell.count)}`}
                          aria-pressed={selectedDate === cell.date}
                          className={`commit-calendar-cell commit-calendar-level-${getLevel(cell.count, maxCount)}${cell.inRange ? '' : ' commit-calendar-outside'}`}
                          key={cell.date}
                          onBlur={() => setActiveCell(null)}
                          onClick={() => cell.inRange && selectCell(cell)}
                          onFocus={() => cell.inRange && setActiveCell(cell)}
                          onKeyDown={(event) => handleCellKeyDown(event, cell)}
                          onMouseEnter={() => cell.inRange && setActiveCell(cell)}
                          onMouseLeave={() => setActiveCell(null)}
                          ref={(element) => {
                            if (element) cellRefs.current.set(cell.date, element)
                            else cellRefs.current.delete(cell.date)
                          }}
                          role={cell.inRange ? 'button' : undefined}
                          rx="2"
                          tabIndex={cell.inRange ? tabIndex : undefined}
                          x={cell.week * CELL_STEP}
                          y={cell.weekday * CELL_STEP}
                          width={CELL_SIZE}
                          height={CELL_SIZE}
                        >
                          <title>
                            {dateFormatter.format(new Date(`${cell.date}T00:00:00Z`))} — {formatCount(cell.count)}
                          </title>
                        </rect>
                      )
                    })}
                  </svg>
                  {activeCell && (
                    <div
                      className="commit-calendar-tooltip pointer-events-none absolute top-0 z-20 whitespace-nowrap rounded-md border px-3 py-2 text-xs shadow-lg"
                      role="tooltip"
                      style={{
                        left: Math.min(
                          activeCell.week * CELL_STEP,
                          weekCount * CELL_STEP - 168
                        ),
                      }}
                    >
                      {dateFormatter.format(new Date(`${activeCell.date}T00:00:00Z`))} — {formatCount(activeCell.count)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="dark:text-slate-400 mt-3 flex items-center justify-end gap-2 text-xs text-slate-500">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                aria-hidden="true"
                className={`commit-calendar-legend commit-calendar-level-${level}`}
                key={level}
              />
            ))}
            <span>More</span>
          </div>
        </>
      ) : null}
    </section>
  )
}
