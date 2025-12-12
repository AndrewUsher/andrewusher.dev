import { useState, useMemo } from 'react';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { formatVoiceName, getLanguageDisplayName } from './utils';

export default function VoiceShowcase() {
  const [text, setText] = useState('Hello! This is a test of different voices.');
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);

  const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();

  const selectedVoice = voices[selectedVoiceIndex];

  // Group voices by language for better organization
  const voicesByLanguage = useMemo(() => {
    const groups: Record<string, SpeechSynthesisVoice[]> = {};
    voices.forEach((voice) => {
      const lang = voice.lang;
      if (!groups[lang]) {
        groups[lang] = [];
      }
      groups[lang]!.push(voice);
    });
    return groups;
  }, [voices]);

  const handleSpeak = () => {
    if (text.trim() && selectedVoice) {
      speak(text, { voice: selectedVoice });
    }
  };

  const handleStop = () => {
    cancel();
  };

  if (!supported) {
    return (
      <div className="my-8 border-l-8 border-l-red-500 bg-red-200/50 p-4 dark:border-l-red-400 dark:bg-red-900/30 dark:text-white">
        <strong>Speech Synthesis Not Supported</strong>
        <p className="mt-2">
          Your browser doesn't support the Speech Synthesis API. Try using a modern version of
          Chrome, Safari, Firefox, or Edge.
        </p>
      </div>
    );
  }

  if (voices.length === 0) {
    return (
      <div className="my-8 rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">Loading voices...</p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <label
          htmlFor="voice-text"
          className="mb-2 block font-semibold dark:text-white"
        >
          Text to speak
        </label>
        <textarea
          id="voice-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          placeholder="Enter text to be spoken..."
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="voice-select"
          className="mb-2 block font-semibold dark:text-white"
        >
          Select Voice ({voices.length} available)
        </label>
        <select
          id="voice-select"
          value={selectedVoiceIndex}
          onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
          className="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        >
          {Object.entries(voicesByLanguage).map(([lang, langVoices]) => (
            <optgroup
              key={lang}
              label={`${getLanguageDisplayName(lang)} (${lang})`}
            >
              {langVoices.map((voice) => {
                const voiceIndex = voices.indexOf(voice);
                return (
                  <option key={voiceIndex} value={voiceIndex}>
                    {formatVoiceName(voice)}
                    {voice.default ? ' (Default)' : ''}
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </div>

      {selectedVoice && (
        <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
          <h3 className="mb-2 font-semibold dark:text-white">Voice Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Name:</dt>
              <dd className="font-medium dark:text-white">{selectedVoice.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Language:</dt>
              <dd className="font-medium dark:text-white">
                {getLanguageDisplayName(selectedVoice.lang)} ({selectedVoice.lang})
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Local Service:</dt>
              <dd className="font-medium dark:text-white">
                {selectedVoice.localService ? (
                  <span className="text-green-600 dark:text-green-400">Yes (On-device)</span>
                ) : (
                  <span className="text-orange-600 dark:text-orange-400">No (Network)</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Default Voice:</dt>
              <dd className="font-medium dark:text-white">
                {selectedVoice.default ? 'Yes' : 'No'}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSpeak}
          disabled={speaking || !text.trim() || !selectedVoice}
          className="rounded bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          {speaking ? 'Speaking...' : 'Test Voice'}
        </button>

        <button
          onClick={handleStop}
          disabled={!speaking}
          className="rounded bg-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-500 dark:hover:bg-gray-600"
        >
          Stop
        </button>
      </div>

      {speaking && selectedVoice && (
        <div className="mt-4 flex items-center gap-2 text-sky-600 dark:text-sky-400">
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
            Speaking with {formatVoiceName(selectedVoice)}
          </span>
        </div>
      )}

      <div className="mt-6 rounded border-l-4 border-l-blue-500 bg-blue-50 p-4 dark:border-l-blue-400 dark:bg-blue-900/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Tip:</strong> Voice availability varies by platform. Desktop browsers typically
          offer more voices than mobile browsers. iOS Safari is especially limited.
        </p>
      </div>
    </div>
  );
}
