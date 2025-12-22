import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type HibernationState = 'active' | 'idle' | 'hibernating' | 'resuming'

interface StateInfo {
  state: HibernationState
  label: string
  description: string
  color: string
  icon: string
}

const states: StateInfo[] = [
  {
    state: 'active',
    label: 'Active',
    description: 'Processing requests and maintaining connections',
    color: 'bg-green-500',
    icon: '⚡'
  },
  {
    state: 'idle',
    label: 'Idle',
    description: 'No active connections, waiting for hibernation timeout',
    color: 'bg-yellow-500',
    icon: '⏳'
  },
  {
    state: 'hibernating',
    label: 'Hibernating',
    description: 'Frozen state, consuming no CPU. Waiting for wake event',
    color: 'bg-gray-500',
    icon: '💤'
  },
  {
    state: 'resuming',
    label: 'Resuming',
    description: 'Waking from hibernation to handle new request',
    color: 'bg-blue-500',
    icon: '🔄'
  }
]

export default function HibernationDemo() {
  const [currentState, setCurrentState] = useState<HibernationState>('active')
  const [autoProgress, setAutoProgress] = useState(false)
  const [timeInState, setTimeInState] = useState(0)

  const hibernationTimeout = 5

  useEffect(() => {
    if (!autoProgress) return

    const stateSequence: HibernationState[] = ['active', 'idle', 'hibernating', 'resuming']
    const durations = [3000, 5000, 4000, 2000]

    const currentIndex = stateSequence.indexOf(currentState)
    const duration = durations[currentIndex]

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % stateSequence.length
      setCurrentState(stateSequence[nextIndex])
      setTimeInState(0)
    }, duration)

    return () => clearTimeout(timer)
  }, [currentState, autoProgress])

  useEffect(() => {
    if (!autoProgress) return

    const interval = setInterval(() => {
      setTimeInState(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [autoProgress])

  const currentStateInfo = states.find(s => s.state === currentState)!

  return (
    <div className="my-8 p-6 bg-white dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-neutral-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        Hibernation Lifecycle
      </h3>

      {/* State selector */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap mb-3">
          {states.map(state => (
            <button
              key={state.state}
              onClick={() => {
                setCurrentState(state.state)
                setTimeInState(0)
                setAutoProgress(false)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentState === state.state
                  ? `${state.color} text-white`
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`}
            >
              {state.icon} {state.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoProgress}
            onChange={(e) => setAutoProgress(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Auto-cycle through states
          </span>
        </label>
      </div>

      {/* Current state display */}
      <motion.div
        key={currentState}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-lg ${currentStateInfo.color} text-white mb-6`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{currentStateInfo.icon}</span>
          <h4 className="text-2xl font-bold">{currentStateInfo.label}</h4>
        </div>
        <p className="text-white/90">{currentStateInfo.description}</p>
        {autoProgress && (
          <div className="mt-3 text-sm opacity-80">
            Time in state: {timeInState}s
          </div>
        )}
      </motion.div>

      {/* Timeline visualization */}
      <div className="mb-6">
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          State Transition Timeline
        </div>
        <div className="flex items-center gap-2">
          {states.map((state, index) => {
            const isCurrent = state.state === currentState
            const isPast = states.findIndex(s => s.state === currentState) > index

            return (
              <div key={state.state} className="flex-1 flex items-center">
                <div className="relative flex-1">
                  <motion.div
                    className={`h-2 rounded-full transition-colors ${
                      isCurrent || isPast ? state.color : 'bg-slate-200 dark:bg-neutral-700'
                    }`}
                    animate={isCurrent ? { opacity: [1, 0.5, 1] } : {}}
                    transition={isCurrent ? { duration: 1.5, repeat: Infinity } : {}}
                  />
                  <div className="absolute -top-6 left-0 right-0 text-center">
                    <span className={`text-xs ${isCurrent ? 'font-bold' : 'opacity-60'} text-slate-700 dark:text-slate-300`}>
                      {state.label}
                    </span>
                  </div>
                </div>
                {index < states.length - 1 && (
                  <div className="w-4 h-0.5 bg-slate-300 dark:bg-neutral-600 mx-1" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Details based on current state */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
            When does this happen?
          </h5>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {currentState === 'active' && `While processing WebSocket messages, HTTP requests, or during the first ${hibernationTimeout} seconds after the last activity.`}
            {currentState === 'idle' && `After ${hibernationTimeout} seconds of no WebSocket messages or HTTP requests. The hibernation timer has started.`}
            {currentState === 'hibernating' && `After idle timeout expires with no new activity. The Durable Object is frozen and consumes no resources.`}
            {currentState === 'resuming' && 'When a new WebSocket message, HTTP request, or alarm triggers while hibernating. State is restored and processing continues.'}
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-neutral-800 rounded-lg">
          <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
            Cost Impact
          </h5>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {currentState === 'active' && 'Full CPU time billing. Normal Durable Objects pricing applies for all processing.'}
            {currentState === 'idle' && 'Still billing for CPU time as the object is actively running, just not processing requests.'}
            {currentState === 'hibernating' && '💰 No CPU billing! Only storage costs apply. This is where hibernation saves money.'}
            {currentState === 'resuming' && 'Brief CPU time for state restoration (~few milliseconds), then returns to active billing.'}
          </p>
        </div>
      </div>

      {/* Code example */}
      <div className="mt-6 p-4 bg-slate-900 dark:bg-black rounded-lg">
        <div className="text-xs text-slate-400 mb-2 font-mono">Relevant API:</div>
        <pre className="text-sm text-green-400 font-mono overflow-x-auto">
          {currentState === 'active' && `// Active state - handling messages
webSocketMessage(ws, message) {
  // Process incoming message
  this.broadcast(message)
}`}
          {currentState === 'idle' && `// Idle state - waiting for hibernation
// No code needed - automatic after ${hibernationTimeout}s
// Timer starts when last connection closes`}
          {currentState === 'hibernating' && `// Hibernated automatically
// Object frozen, no code running
// State persisted in memory`}
          {currentState === 'resuming' && `// Resume on new activity
webSocketMessage(ws, message) {
  // Automatically resumed!
  // State fully restored
  this.handleMessage(message)
}`}
        </pre>
      </div>
    </div>
  )
}
