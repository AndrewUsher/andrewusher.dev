import { useState } from 'react'
import { useSpeechSynthesis } from './useSpeechSynthesis'

export default function BasicPlayground() {
  const [text, setText] = useState(
    'Hello! Try changing this text and click speak to hear it.'
  )
  const { speak, cancel, speaking, supported } = useSpeechSynthesis()

  const handleSpeak = () => {
    if (text.trim()) {
      speak(text)
    }
  }

  const handleStop = () => {
    cancel()
  }

  if (!supported) {
    return (
      <div className="dark:border-l-red-400 dark:bg-red-900/30 dark:text-white my-8 border-l-8 border-l-red-500 bg-red-200/50 p-4">
        <strong>Speech Synthesis Not Supported</strong>
        <p className="mt-2">
          Your browser doesn&apos;t support the Speech Synthesis API. Try using
          a modern version of Chrome, Safari, Firefox, or Edge.
        </p>
      </div>
    )
  }

  return (
    <div className="dark:border-gray-700 dark:bg-gray-800 my-8 rounded-lg border border-gray-300 bg-white p-6">
      <div className="mb-4">
        <label
          htmlFor="basic-text"
          className="dark:text-white mb-2 block font-semibold"
        >
          Text to speak
        </label>
        <textarea
          id="basic-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
          placeholder="Enter text to be spoken..."
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSpeak}
          disabled={speaking || !text.trim()}
          className="dark:bg-sky-500 dark:hover:bg-sky-600 rounded bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
        >
          {speaking ? 'Speaking...' : 'Speak'}
        </button>

        <button
          onClick={handleStop}
          disabled={!speaking}
          className="dark:bg-gray-500 dark:hover:bg-gray-600 rounded bg-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          Stop
        </button>
      </div>

      {speaking && (
        <div className="dark:text-sky-400 mt-4 flex items-center gap-2 text-sky-600">
          <svg
            className="h-5 w-5 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Speaking...</span>
        </div>
      )}
    </div>
  )
}
