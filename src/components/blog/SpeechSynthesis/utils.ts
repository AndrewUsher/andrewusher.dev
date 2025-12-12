/**
 * Check if the Speech Synthesis API is supported in the current browser
 */
export function checkBrowserSupport(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Format a voice name for display, removing system prefixes and making it more readable
 */
export function formatVoiceName(voice: SpeechSynthesisVoice): string {
  let name = voice.name

  // Remove common prefixes
  name = name.replace(/^(Google|Microsoft|Apple|Samsung)\s+/i, '')

  // Remove language code suffixes in parentheses if they match the lang property
  const langInParens = name.match(/\(([^)]+)\)$/)
  if (langInParens && voice.lang.startsWith(langInParens[1] || '')) {
    name = name.replace(/\s*\([^)]+\)$/, '')
  }

  return name
}

/**
 * Get a display-friendly language name from a language code
 */
export function getLanguageDisplayName(langCode: string): string {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' })
    // Extract just the language part (before the hyphen)
    const languageOnly = langCode.split('-')[0]
    return displayNames.of(languageOnly || '') || langCode
  } catch {
    return langCode
  }
}

/**
 * Group voices by language
 */
export function groupVoicesByLanguage(
  voices: SpeechSynthesisVoice[]
): Record<string, SpeechSynthesisVoice[]> {
  return voices.reduce((groups, voice) => {
    const language = voice.lang
    if (!groups[language]) {
      groups[language] = []
    }
    groups[language]!.push(voice)
    return groups
  }, {} as Record<string, SpeechSynthesisVoice[]>)
}

/**
 * Get the default voice for a given language, or the system default
 */
export function getDefaultVoice(
  voices: SpeechSynthesisVoice[],
  preferredLang?: string
): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) return undefined

  // If a preferred language is specified, try to find a voice for that language
  if (preferredLang) {
    const langVoice = voices.find(
      (voice) => voice.lang.startsWith(preferredLang) && voice.default
    )
    if (langVoice) return langVoice

    // If no default for that language, return the first voice for that language
    const firstLangVoice = voices.find((voice) =>
      voice.lang.startsWith(preferredLang)
    )
    if (firstLangVoice) return firstLangVoice
  }

  // Otherwise, return the system default voice
  const defaultVoice = voices.find((voice) => voice.default)
  if (defaultVoice) return defaultVoice

  // If no default is set, return the first voice
  return voices[0]
}

/**
 * Create a speech synthesis utterance with default parameters
 */
export function createUtterance(
  text: string,
  options: {
    voice?: SpeechSynthesisVoice
    pitch?: number
    rate?: number
    volume?: number
  } = {}
): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text)

  // Apply options with defaults
  if (options.voice) utterance.voice = options.voice
  utterance.pitch = options.pitch ?? 1
  utterance.rate = options.rate ?? 1
  utterance.volume = options.volume ?? 1

  return utterance
}

/**
 * Detect the platform and return platform-specific information
 */
export function getPlatformInfo() {
  if (typeof window === 'undefined') {
    return {
      platform: 'unknown',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
    }
  }

  const userAgent = window.navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(userAgent)
  const isAndroid = /android/.test(userAgent)
  const isMobile = isIOS || isAndroid

  return {
    platform: isIOS ? 'ios' : isAndroid ? 'android' : 'desktop',
    isMobile,
    isIOS,
    isAndroid,
  }
}

/**
 * Check if the browser supports the onboundary event
 * (Not supported in Firefox and Safari)
 */
export function supportsBoundaryEvent(): boolean {
  if (!checkBrowserSupport()) return false

  // Create a test utterance to check for the onboundary property
  const test = new SpeechSynthesisUtterance()
  return 'onboundary' in test
}

/**
 * Split long text into chunks to work around browser limitations
 * Some browsers (notably Chrome on some platforms) cut off text after ~200-300 characters
 */
export function chunkText(text: string, maxChunkSize = 200): string[] {
  if (text.length <= maxChunkSize) return [text]

  const chunks: string[] = []
  let currentChunk = ''

  // Split by sentences first
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxChunkSize) {
      currentChunk += sentence
    } else {
      if (currentChunk) chunks.push(currentChunk.trim())
      currentChunk = sentence
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim())

  return chunks
}
