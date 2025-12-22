import { motion } from 'framer-motion'
import type { ConnectionNodeProps } from '../types'

const statusColors = {
  connecting: 'bg-yellow-500 border-yellow-600',
  connected: 'bg-green-500 border-green-600',
  hibernating: 'bg-gray-400 border-gray-500',
  disconnected: 'bg-gray-300 border-gray-400',
  error: 'bg-red-500 border-red-600',
}

const statusLabels = {
  connecting: 'Connecting...',
  connected: 'Connected',
  hibernating: 'Hibernating',
  disconnected: 'Disconnected',
  error: 'Error',
}

export function ConnectionNode({
  id,
  label,
  status,
  position,
  onClick,
}: ConnectionNodeProps) {
  const colorClass = statusColors[status]
  const pulseAnimation =
    status === 'connected'
      ? {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity },
        }
      : {}

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {/* Main node circle */}
        <motion.div
          className={`h-16 w-16 rounded-full border-4 ${colorClass} flex items-center justify-center shadow-lg`}
          animate={pulseAnimation}
        >
          {/* Status indicator dot */}
          <div
            className={`h-3 w-3 rounded-full ${
              status === 'connected' ? 'bg-white' : 'bg-white/50'
            }`}
          />

          {/* Pulse effect for connected status */}
          {status === 'connected' && (
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/30" />
          )}
        </motion.div>

        {/* Label */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 transform whitespace-nowrap">
          <div className="dark:text-white text-center text-sm font-medium text-slate-900">
            {label}
          </div>
          <div
            className={`mt-1 text-center text-xs ${
              status === 'connected'
                ? 'dark:text-green-400 text-green-600'
                : status === 'error'
                ? 'dark:text-red-400 text-red-600'
                : 'dark:text-slate-400 text-slate-500'
            }`}
          >
            {statusLabels[status]}
          </div>
        </div>

        {/* Hover tooltip with ID */}
        {onClick && (
          <div className="dark:bg-slate-700 pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity hover:opacity-100">
            Click to remove
          </div>
        )}
      </div>
    </motion.div>
  )
}
