import { useState } from 'react'
import { useSpeechSynthesis } from './useSpeechSynthesis'
import { supportsBoundaryEvent } from './utils'

interface EventLog {
  type: string
  timestamp: number
  data?: string | undefined
}

export default function EventsDemo() {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog.'
  )
  const [eventLogs, setEventLogs] = useState<EventLog[]>([])
  const [currentWord, setCurrentWord] = useState<string>('')

  const { speak, cancel, pause, resume, speaking, paused, supported } =
    useSpeechSynthesis()
  const hasBoundary = supportsBoundaryEvent()

  const addLog = (type: string, data?: string) => {
    setEventLogs((prev) => [
      ...prev,
      {
        type,
        timestamp: Date.now(),
        data,
      },
    ])
  }

  const clearLogs = () => {
    setEventLogs([])
    setCurrentWord('')
  }

  const handleSpeak = () => {
    clearLogs()

    if (text.trim()) {
      speak(text, {
        onStart: () => addLog('start', 'Speech started'),
        onEnd: () => {
          addLog('end', 'Speech completed')
          setCurrentWord('')
        },
        onError: (event) => addLog('error', `Error: ${event.error}`),
        onPause: () => addLog('pause', 'Speech paused'),
        onResume: () => addLog('resume', 'Speech resumed'),
        onBoundary: (event) => {
          if (event.name === 'word') {
            const word = text.substring(
              event.charIndex,
              event.charIndex + event.charLength
            )
            setCurrentWord(word)
            addLog('boundary', `Word: "${word}"`)
          }
        },
      })
    }
  }

  const handlePause = () => {
    pause()
  }

  const handleResume = () => {
    resume()
  }

  const handleStop = () => {
    cancel()
  }

  if (!supported) {
    return (
      <div className="dark:border-l-red-400 dark:bg-red-900/30 dark:text-white my-8 border-l-8 border-l-red-500 bg-red-200/50 p-4">
        <strong>Speech Synthesis Not Supported</strong>
        <p className="mt-2">
          Your browser doesn't support the Speech Synthesis API. Try using a
          modern version of Chrome, Safari, Firefox, or Edge.
        </p>
      </div>
    )
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'start':
        return '▶️'
      case 'end':
        return '✅'
      case 'error':
        return '❌'
      case 'pause':
        return '⏸️'
      case 'resume':
        return '▶️'
      case 'boundary':
        return '📍'
      default:
        return '•'
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'start':
      case 'resume':
        return 'text-green-600 dark:text-green-400'
      case 'end':
        return 'text-blue-600 dark:text-blue-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      case 'pause':
        return 'text-orange-600 dark:text-orange-400'
      case 'boundary':
        return 'text-purple-600 dark:text-purple-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="dark:border-gray-700 dark:bg-gray-800 my-8 rounded-lg border border-gray-300 bg-white p-6">
      <div className="mb-4">
        <label
          htmlFor="events-text"
          className="dark:text-white mb-2 block font-semibold"
        >
          Text to speak
        </label>
        <textarea
          id="events-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
          placeholder="Enter text to be spoken..."
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={handleSpeak}
          disabled={speaking || !text.trim()}
          className="dark:bg-sky-500 dark:hover:bg-sky-600 rounded bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
        >
          Speak
        </button>

        <button
          onClick={handlePause}
          disabled={!speaking || paused}
          className="dark:bg-orange-500 dark:hover:bg-orange-600 rounded bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50"
        >
          Pause
        </button>

        <button
          onClick={handleResume}
          disabled={!paused}
          className="dark:bg-green-500 dark:hover:bg-green-600 rounded bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          Resume
        </button>

        <button
          onClick={handleStop}
          disabled={!speaking}
          className="dark:bg-gray-500 dark:hover:bg-gray-600 rounded bg-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          Stop
        </button>

        <button
          onClick={clearLogs}
          className="dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Clear Log
        </button>
      </div>

      {currentWord && hasBoundary && (
        <div className="dark:bg-purple-900/30 mb-4 rounded-lg bg-purple-100 p-4">
          <p className="dark:text-gray-400 text-sm text-gray-600">
            Current word:
          </p>
          <p className="dark:text-purple-400 text-2xl font-bold text-purple-600">
            {currentWord}
          </p>
        </div>
      )}

      {!hasBoundary && (
        <div className="dark:border-l-yellow-400 dark:bg-yellow-900/20 mb-4 rounded border-l-4 border-l-yellow-500 bg-yellow-50 p-4">
          <p className="dark:text-gray-300 text-sm text-gray-700">
            <strong>Note:</strong> Your browser doesn't support the{' '}
            <code className="dark:bg-gray-700 rounded bg-gray-200 px-1">
              onboundary
            </code>{' '}
            event, so word-level tracking won't be shown.
          </p>
        </div>
      )}

      <div className="dark:bg-gray-900 rounded-lg bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="dark:text-white font-semibold">Event Log</h3>
          <span className="dark:text-gray-400 text-xs text-gray-600">
            {eventLogs.length} events
          </span>
        </div>

        {eventLogs.length === 0 ? (
          <p className="dark:text-gray-400 text-sm text-gray-600">
            No events yet. Click "Speak" to start.
          </p>
        ) : (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {eventLogs.map((log, index) => (
              <div
                key={index}
                className="dark:border-gray-700 dark:bg-gray-800 flex items-start gap-3 rounded border border-gray-200 bg-white p-3 text-sm"
              >
                <span className="text-lg">{getEventIcon(log.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${getEventColor(log.type)}`}
                    >
                      {log.type}
                    </span>
                    <span className="dark:text-gray-500 text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {log.data && (
                    <p className="dark:text-gray-300 mt-1 text-gray-700">
                      {log.data}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dark:bg-blue-900/20 mt-6 rounded-lg bg-blue-50 p-4">
        <h4 className="dark:text-white mb-2 font-semibold">How it works</h4>
        <pre className="dark:bg-gray-900 overflow-x-auto rounded bg-white p-4 text-xs">
          <code className="dark:text-gray-200 text-gray-800">{`const utterance = new SpeechSynthesisUtterance(text);

utterance.onstart = () => console.log('Started');
utterance.onend = () => console.log('Completed');
utterance.onpause = () => console.log('Paused');
utterance.onresume = () => console.log('Resumed');
utterance.onerror = (e) => console.error('Error:', e);
utterance.onboundary = (e) => {
  // Track word boundaries (not supported in all browsers)
  console.log('Word:', e.charIndex);
};

speechSynthesis.speak(utterance);`}</code>
        </pre>
      </div>
    </div>
  )
}
