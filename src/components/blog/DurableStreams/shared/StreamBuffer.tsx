import { motion, AnimatePresence } from 'framer-motion'
import type { StreamBufferProps } from '../types'

export function StreamBuffer({
  items,
  maxSize,
  showBackpressure = true,
}: StreamBufferProps) {
  const fillPercentage = (items.length / maxSize) * 100
  const isWarning = fillPercentage >= 75
  const isFull = fillPercentage >= 100

  return (
    <div className="w-full">
      {/* Buffer header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="dark:text-slate-300 text-sm font-medium text-slate-700">
          Stream Buffer
        </div>
        <div
          className={`font-mono text-xs ${
            isFull
              ? 'dark:text-red-400 font-bold text-red-600'
              : isWarning
              ? 'dark:text-yellow-400 text-yellow-600'
              : 'dark:text-slate-400 text-slate-500'
          }`}
        >
          {items.length} / {maxSize}
        </div>
      </div>

      {/* Buffer visualization */}
      <div className="dark:bg-neutral-800 dark:border-neutral-700 relative h-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        {/* Fill indicator */}
        <motion.div
          className={`absolute inset-y-0 left-0 ${
            isFull ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-blue-500'
          } transition-colors duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${fillPercentage}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Buffer items visualization */}
        <div className="relative flex h-full items-center gap-0.5 px-2">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={typeof item === 'object' && 'id' in item ? item.id : index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-8 w-1.5 rounded-sm bg-white/50"
                title={
                  typeof item === 'object' ? JSON.stringify(item) : String(item)
                }
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Overflow indicator */}
        {isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm"
          >
            <span className="dark:text-red-300 text-sm font-bold text-red-700">
              BUFFER FULL
            </span>
          </motion.div>
        )}
      </div>

      {/* Backpressure indicator */}
      {showBackpressure && (
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              isFull
                ? 'animate-pulse bg-red-500'
                : isWarning
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          />
          <span className="dark:text-slate-400 text-xs text-slate-600">
            {isFull
              ? 'Backpressure active - slowing source'
              : isWarning
              ? 'Buffer filling - backpressure imminent'
              : 'Normal flow'}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="dark:bg-neutral-700 mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className={`h-full ${
            isFull ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
          } transition-colors duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${fillPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
