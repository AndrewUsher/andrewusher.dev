import { useEffect, useState } from 'react'

export default function BrowserCompatibility() {
  const [isSupported, setIsSupported] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const supported = 'cookieStore' in window
    setIsSupported(supported)
    setChecked(true)
  }, [])

  const features = [
    {
      name: 'get()',
      description: 'Retrieve a single cookie by name or options',
      supported: isSupported,
    },
    {
      name: 'getAll()',
      description: 'Retrieve all matching cookies',
      supported: isSupported,
    },
    {
      name: 'set()',
      description: 'Set a cookie with name, value, and options',
      supported: isSupported,
    },
    {
      name: 'delete()',
      description: 'Delete a cookie by name or options',
      supported: isSupported,
    },
    {
      name: 'change event',
      description: 'Subscribe to cookie change notifications',
      supported: isSupported,
    },
    {
      name: 'Partitioned cookies',
      description: 'Scoped cookies with independent partitioned state (CHIPS)',
      supported: isSupported && typeof window.cookieStore !== 'undefined',
    },
  ]

  const browsers = [
    { name: 'Chrome', minVersion: '87+', supported: true },
    { name: 'Firefox', minVersion: '140+', supported: true },
    { name: 'Safari', minVersion: '18.4+', supported: true },
    { name: 'Edge', minVersion: '87+', supported: true },
    { name: 'Opera', minVersion: '74+', supported: true },
  ]

  if (!checked) {
    return (
      <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
        <p className="dark:text-slate-400 text-center text-slate-600">
          Checking browser support...
        </p>
      </div>
    )
  }

  return (
    <div className="dark:border-neutral-700 dark:bg-neutral-800 my-8 rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <h3 className="dark:text-white mb-2 text-xl font-bold text-slate-900">
          Browser Compatibility
        </h3>
        <p className="dark:text-slate-400 text-sm text-slate-600">
          Current browser support status and feature availability.
        </p>
      </div>

      <div className="mb-6">
        <div
          className={`mb-4 rounded-lg border p-4 ${
            isSupported
              ? 'dark:border-green-800 dark:bg-green-900/20 border-green-200 bg-green-50'
              : 'dark:border-red-800 dark:bg-red-900/20 border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center gap-3">
            {isSupported ? (
              <svg
                className="dark:text-green-400 h-8 w-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="dark:text-red-400 h-8 w-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <div>
              <h4
                className={`font-semibold ${
                  isSupported
                    ? 'dark:text-green-300 text-green-900'
                    : 'dark:text-red-300 text-red-900'
                }`}
              >
                {isSupported
                  ? 'Cookie Store API is Supported!'
                  : 'Cookie Store API Not Supported'}
              </h4>
              <p
                className={`text-sm ${
                  isSupported
                    ? 'dark:text-green-200 text-green-800'
                    : 'dark:text-red-200 text-red-800'
                }`}
              >
                {isSupported
                  ? 'Your browser supports the Cookie Store API'
                  : 'Your browser does not support the Cookie Store API'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="dark:text-white mb-3 font-semibold text-slate-900">
            Feature Support
          </h4>
          <div className="space-y-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="dark:border-neutral-700 dark:bg-neutral-900 flex items-start gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span
                  className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    feature.supported
                      ? 'dark:bg-green-900/30 dark:text-green-400 bg-green-100 text-green-700'
                      : 'dark:bg-red-900/30 dark:text-red-400 bg-red-100 text-red-700'
                  }`}
                >
                  {feature.supported ? '✓' : '✗'}
                </span>
                <div>
                  <p className="dark:text-white font-medium text-slate-900">
                    {feature.name}
                  </p>
                  <p className="dark:text-slate-400 text-xs text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="dark:text-white mb-3 font-semibold text-slate-900">
            Browser Support Matrix
          </h4>
          <div className="space-y-2">
            {browsers.map((browser) => (
              <div
                key={browser.name}
                className="dark:border-neutral-700 dark:bg-neutral-900 flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="dark:text-white font-medium text-slate-900">
                  {browser.name}
                </span>
                <span className="dark:text-slate-400 text-sm text-slate-600">
                  {browser.minVersion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isSupported && (
        <div className="dark:border-sky-800 dark:bg-sky-900/20 rounded-lg border border-sky-200 bg-sky-50 p-4">
          <h4 className="dark:text-sky-300 mb-2 font-semibold text-sky-900">
            Fallback Strategy
          </h4>
          <p className="dark:text-sky-200 mb-3 text-sm text-sky-800">
            You can use feature detection to provide a fallback to{' '}
            <code className="font-mono">document.cookie</code>:
          </p>
          <pre className="overflow-x-auto rounded bg-slate-900 p-4 text-sm">
            <code className="font-mono text-slate-200">
              {`if ('cookieStore' in window) {
  // Use Cookie Store API
  const cookie = await cookieStore.get('session');
} else {
  // Fallback to document.cookie
  const cookies = document.cookie;
  // Parse cookie string...
}`}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}
