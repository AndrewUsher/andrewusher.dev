import { useState, useMemo, useEffect } from 'react'
import CodePreview from './shared/CodePreview'
import type { CookieSetOptions } from './shared/types'

export default function PropertyBuilder() {
  const [options, setOptions] = useState<CookieSetOptions>({
    name: 'demo_session',
    value: 'user123',
    expires: undefined,
    domain: '',
    path: '/',
    sameSite: 'Lax',
    secure: true,
    partitioned: false,
  })

  const [showCode, setShowCode] = useState(true)

  const codePreview = useMemo(() => {
    const lines: string[] = []
    lines.push(`await cookieStore.set({`)
    lines.push(`  name: '${options.name}',`)
    lines.push(`  value: '${options.value}',`)

    if (options.expires && typeof options.expires === 'number') {
      lines.push(`  expires: ${options.expires},`)
    }

    if (options.domain) {
      lines.push(`  domain: '${options.domain}',`)
    }

    if (options.path) {
      lines.push(`  path: '${options.path}',`)
    }

    if (options.sameSite) {
      lines.push(`  sameSite: '${options.sameSite}',`)
    }

    if (options.secure) {
      lines.push(`  secure: true,`)
    }

    if (options.partitioned) {
      lines.push(`  partitioned: true,`)
    }

    lines.push('})')

    return lines.join('\n')
  }, [options])

  const [warnings, setWarnings] = useState<string[]>([])

  const validateOptions = () => {
    const newWarnings: string[] = []

    if (options.sameSite === 'None' && !options.secure) {
      newWarnings.push('SameSite=None requires Secure=true')
    }

    if (options.domain && options.domain.startsWith('.')) {
      newWarnings.push('Leading dots in domain are discouraged')
    }

    setWarnings(newWarnings)
  }

  useEffect(() => {
    validateOptions()
  }, [options])

  const handleExpiryChange = (type: 'none' | 'date' | 'duration') => {
    if (type === 'none') {
      setOptions({ ...options, expires: undefined })
    } else if (type === 'duration') {
      const now = new Date()
      now.setDate(now.getDate() + 7)
      setOptions({ ...options, expires: now.getTime() })
    }
  }

  return (
    <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <h3 className="dark:text-white mb-2 text-xl font-bold text-slate-900">
          Cookie Property Builder
        </h3>
        <p className="dark:text-slate-400 text-sm text-slate-600">
          Configure cookie properties and see the generated code in real-time.
        </p>
      </div>

      {warnings.length > 0 && (
        <div aria-live="polite" className="mb-4 space-y-2">
          {warnings.map((warning, index) => {
            const id = `warning-${index}`
            return (
              <div
                key={index}
                id={id}
                className="dark:border-amber-800 dark:bg-amber-900/20 flex items-start gap-2 rounded border border-amber-200 bg-amber-50 px-4 py-2"
              >
                <svg
                  className="dark:text-amber-400 mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="dark:text-amber-200 text-sm text-amber-800">
                  {warning}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cookie-name"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="cookie-name"
              type="text"
              value={options.name || ''}
              onChange={(e) => {
                setOptions({ ...options, name: e.target.value })
              }}
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="cookie-value"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Value
            </label>
            <input
              id="cookie-value"
              type="text"
              value={options.value || ''}
              onChange={(e) => {
                setOptions({ ...options, value: e.target.value })
              }}
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="dark:text-slate-300 mb-2 block text-sm font-medium text-slate-700">
              Expiration
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleExpiryChange('none')}
                className={`flex-1 rounded border px-3 py-2 text-sm ${
                  !options.expires
                    ? 'dark:bg-sky-900/20 dark:text-sky-300 border-sky-500 bg-sky-50 text-sky-700'
                    : 'dark:border-neutral-600 dark:text-slate-300 dark:hover:bg-neutral-800 border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Session
              </button>
              <button
                type="button"
                onClick={() => handleExpiryChange('duration')}
                className={`flex-1 rounded border px-3 py-2 text-sm ${
                  options.expires
                    ? 'dark:bg-sky-900/20 dark:text-sky-300 border-sky-500 bg-sky-50 text-sky-700'
                    : 'dark:border-neutral-600 dark:text-slate-300 dark:hover:bg-neutral-800 border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                7 Days
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="cookie-domain"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Domain
            </label>
            <input
              id="cookie-domain"
              type="text"
              value={options.domain || ''}
              onChange={(e) => {
                setOptions({ ...options, domain: e.target.value })
              }}
              placeholder="example.com"
              aria-describedby={
                warnings.some((w) => w.includes('domain'))
                  ? 'warning-1'
                  : undefined
              }
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <p className="dark:text-slate-500 mt-1 text-xs text-slate-500">
              Leave empty for current domain
            </p>
          </div>

          <div>
            <label
              htmlFor="cookie-path"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              Path
            </label>
            <input
              id="cookie-path"
              type="text"
              value={options.path || ''}
              onChange={(e) => {
                setOptions({ ...options, path: e.target.value })
              }}
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="cookie-samesite"
              className="dark:text-slate-300 mb-1 block text-sm font-medium text-slate-700"
            >
              SameSite
            </label>
            <select
              id="cookie-samesite"
              value={options.sameSite}
              onChange={(e) => {
                setOptions({
                  ...options,
                  sameSite: e.target.value as 'Strict' | 'Lax' | 'None',
                })
              }}
              aria-describedby={
                warnings.some((w) => w.includes('SameSite'))
                  ? 'warning-0'
                  : undefined
              }
              className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="Strict">Strict</option>
              <option value="Lax">Lax</option>
              <option value="None">None</option>
            </select>
            <p className="dark:text-slate-500 mt-1 text-xs text-slate-500">
              Strict: only same-site • Lax: allows some cross-site • None:
              allows all (requires Secure)
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.secure}
            onChange={(e) => {
              setOptions({ ...options, secure: e.target.checked })
            }}
            aria-describedby={
              warnings.some((w) => w.includes('SameSite'))
                ? 'warning-0'
                : undefined
            }
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span className="dark:text-slate-300 text-sm text-slate-700">
            <strong>Secure</strong> - Only sent over HTTPS
          </span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={options.partitioned || false}
            onChange={(e) => {
              setOptions({ ...options, partitioned: e.target.checked })
            }}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span className="dark:text-slate-300 text-sm text-slate-700">
            <strong>Partitioned (CHIPS)</strong> - Scoped to top-level site
          </span>
        </label>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="dark:text-white font-semibold text-slate-900">
            Generated Code
          </h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="dark:text-sky-400 dark:hover:text-sky-300 text-sm text-sky-600 hover:text-sky-700"
          >
            {showCode ? 'Hide' : 'Show'}
          </button>
        </div>
        {showCode && <CodePreview code={codePreview} language="typescript" />}
      </div>
    </div>
  )
}
