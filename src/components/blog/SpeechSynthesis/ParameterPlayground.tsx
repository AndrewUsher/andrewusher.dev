import { useState } from 'react'
import { useSpeechSynthesis } from './useSpeechSynthesis'

export default function ParameterPlayground() {
  const [text, setText] = useState("I'm speaking with custom parameters!")
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)

  const { speak, cancel, speaking, supported } = useSpeechSynthesis()

  const handleSpeak = () => {
    if (text.trim()) {
      speak(text, { pitch, rate, volume })
    }
  }

  const handleStop = () => {
    cancel()
  }

  const resetParameters = () => {
    setPitch(1)
    setRate(1)
    setVolume(1)
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
      <div className="mb-6">
        <label
          htmlFor="param-text"
          className="dark:text-white mb-2 block font-semibold"
        >
          Text to speak
        </label>
        <textarea
          id="param-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
          placeholder="Enter text to be spoken..."
        />
      </div>

      <div className="mb-6 space-y-6">
        {/* Pitch Control */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="pitch" className="dark:text-white font-semibold">
              Pitch
            </label>
            <span className="font-mono dark:bg-gray-700 dark:text-white rounded bg-gray-200 px-3 py-1 text-sm">
              {pitch.toFixed(1)}
            </span>
          </div>
          <input
            id="pitch"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="dark:accent-sky-500 w-full accent-sky-600"
          />
          <div className="dark:text-gray-400 mt-1 flex justify-between text-xs text-gray-600">
            <span>Lower (0)</span>
            <span>Default (1)</span>
            <span>Higher (2)</span>
          </div>
        </div>

        {/* Rate Control */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="rate" className="dark:text-white font-semibold">
              Rate (Speed)
            </label>
            <span className="font-mono dark:bg-gray-700 dark:text-white rounded bg-gray-200 px-3 py-1 text-sm">
              {rate.toFixed(1)}
            </span>
          </div>
          <input
            id="rate"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="dark:accent-sky-500 w-full accent-sky-600"
          />
          <div className="dark:text-gray-400 mt-1 flex justify-between text-xs text-gray-600">
            <span>Slower (0.1)</span>
            <span>Default (1)</span>
            <span>Faster (3)</span>
          </div>
        </div>

        {/* Volume Control */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="volume" className="dark:text-white font-semibold">
              Volume
            </label>
            <span className="font-mono dark:bg-gray-700 dark:text-white rounded bg-gray-200 px-3 py-1 text-sm">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="dark:accent-sky-500 w-full accent-sky-600"
          />
          <div className="dark:text-gray-400 mt-1 flex justify-between text-xs text-gray-600">
            <span>Silent (0%)</span>
            <span>Default (100%)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
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

        <button
          onClick={resetParameters}
          className="dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Reset
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
          <span className="text-sm font-medium">
            Speaking at {rate.toFixed(1)}x speed, pitch {pitch.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  )
}
