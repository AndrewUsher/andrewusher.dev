import { motion } from 'framer-motion'
import type { AnimatedPacketProps } from '../types'

export function AnimatedPacket({
  packet,
  from,
  to,
  onComplete,
  duration = 800,
}: AnimatedPacketProps) {
  const handleAnimationComplete = onComplete ? () => onComplete() : undefined

  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      initial={{ x: from.x, y: from.y, opacity: 0, scale: 0.5 }}
      animate={{ x: to.x, y: to.y, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: duration / 1000,
        ease: 'easeInOut',
        opacity: { duration: 0.2 },
      }}
      {...(handleAnimationComplete && {
        onAnimationComplete: handleAnimationComplete,
      })}
    >
      <div className="relative">
        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
          <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-75" />
        </div>

        {/* Tooltip showing packet data */}
        <div className="dark:bg-slate-700 absolute left-4 top-0 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {typeof packet.data === 'object'
            ? JSON.stringify(packet.data).slice(0, 30)
            : String(packet.data).slice(0, 30)}
          {(typeof packet.data === 'object'
            ? JSON.stringify(packet.data).length
            : String(packet.data).length) > 30 && '...'}
        </div>
      </div>
    </motion.div>
  )
}
