import { useState, useEffect, useCallback, useRef } from 'react'

export interface SpeechOptions {
  voice?: SpeechSynthesisVoice
  pitch?: number
  rate?: number
  volume?: number
  onStart?: () => void
  onEnd?: () => void
  onError?: (event: SpeechSynthesisErrorEvent) => void
  onPause?: () => void
  onResume?: () => void
  onBoundary?: (event: SpeechSynthesisEvent) => void
}

export interface UseSpeechSynthesisReturn {
  speak: (text: string, options?: SpeechOptions) => void
  cancel: () => void
  pause: () => void
  resume: () => void
  speaking: boolean
  paused: boolean
  voices: SpeechSynthesisVoice[]
  supported: boolean
}

/**
 * Custom hook for Web Speech API - Speech Synthesis
 * Provides a simple interface for text-to-speech functionality
 * with voice selection, parameter control, and lifecycle events.
 *
 * @returns Object containing speak controls, state, and available voices
 */
export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Check if speech synthesis is supported
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Load voices
  useEffect(() => {
    if (!supported) return

    // Initial load attempt
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
      }
    }

    // Load voices immediately
    loadVoices()

    // Some browsers require waiting for the voiceschanged event
    speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [supported])

  // Update speaking and paused state
  useEffect(() => {
    if (!supported) return

    const interval = setInterval(() => {
      setSpeaking(speechSynthesis.speaking)
      setPaused(speechSynthesis.paused)
    }, 100)

    return () => clearInterval(interval)
  }, [supported])

  /**
   * Speak the given text with optional parameters and event handlers
   */
  const speak = useCallback(
    (text: string, options: SpeechOptions = {}) => {
      if (!supported) {
        console.warn('Speech synthesis is not supported in this browser')
        return
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel()

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(text)

      // Apply options
      if (options.voice) utterance.voice = options.voice
      if (options.pitch !== undefined) utterance.pitch = options.pitch
      if (options.rate !== undefined) utterance.rate = options.rate
      if (options.volume !== undefined) utterance.volume = options.volume

      // Attach event handlers
      utterance.onstart = () => {
        setSpeaking(true)
        options.onStart?.()
      }

      utterance.onend = () => {
        setSpeaking(false)
        setPaused(false)
        currentUtteranceRef.current = null
        options.onEnd?.()
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setSpeaking(false)
        setPaused(false)
        currentUtteranceRef.current = null
        options.onError?.(event)
      }

      utterance.onpause = () => {
        setPaused(true)
        options.onPause?.()
      }

      utterance.onresume = () => {
        setPaused(false)
        options.onResume?.()
      }

      if (options.onBoundary) {
        utterance.onboundary = options.onBoundary
      }

      // Store reference and speak
      currentUtteranceRef.current = utterance
      speechSynthesis.speak(utterance)
    },
    [supported]
  )

  /**
   * Cancel any ongoing speech
   */
  const cancel = useCallback(() => {
    if (!supported) return
    speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
    currentUtteranceRef.current = null
  }, [supported])

  /**
   * Pause ongoing speech
   */
  const pause = useCallback(() => {
    if (!supported) return
    speechSynthesis.pause()
  }, [supported])

  /**
   * Resume paused speech
   */
  const resume = useCallback(() => {
    if (!supported) return
    speechSynthesis.resume()
  }, [supported])

  return {
    speak,
    cancel,
    pause,
    resume,
    speaking,
    paused,
    voices,
    supported,
  }
}
