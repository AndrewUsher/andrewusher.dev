import { useEffect, useState } from 'react'

const THEME_OPTIONS = [
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'nord', label: 'Nord' },
] as const

type Theme = typeof THEME_OPTIONS[number]['value']

const STORAGE_KEY = 'shiki-theme-preference'
const DEFAULT_THEME: Theme = 'github-dark'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme = savedTheme ?? DEFAULT_THEME
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-shiki-theme', initialTheme)
  }, [])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
    document.documentElement.setAttribute('data-shiki-theme', newTheme)
  }

  if (!mounted) {
    return (
      <div className="dark:bg-gray-700 h-10 w-40 animate-pulse rounded-md bg-gray-200" />
    )
  }

  return (
    <div className="relative">
      <label htmlFor="theme-select" className="sr-only">
        Select syntax highlighting theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value as Theme)}
        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="dark:text-gray-400 mt-1 text-xs text-gray-500">
        Code theme
      </div>
    </div>
  )
}
