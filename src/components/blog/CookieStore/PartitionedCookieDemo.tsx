import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PartitionedCookieDemo() {
  const [activeTab, setActiveTab] = useState<'explanation' | 'demo'>(
    'explanation'
  )

  return (
    <div className="my-8 p-6 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Partitioned Cookies (CHIPS)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Learn how partitioned cookies work with third-party contexts.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('explanation')}
          className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'explanation'
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 dark:bg-neutral-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-600'
          }`}
        >
          How It Works
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'demo'
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 dark:bg-neutral-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-600'
          }`}
        >
          Visual Demo
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'explanation' ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                What Are Partitioned Cookies?
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Partitioned cookies (CHIPS - Cookies Having Independent Partitioned State)
                are scoped to the top-level site rather than the registrable domain.
                This improves privacy by preventing cross-site tracking while maintaining
                legitimate use cases.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 p-4">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Traditional Cookies
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>
                      Same cookie accessible from multiple sites that share a domain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>
                      Enables cross-site tracking by third-party services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    <span>
                      Browser restrictions (ITP) can block these cookies
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  Partitioned Cookies
                </h4>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Each top-level site gets its own partitioned cookie
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Privacy-respecting alternative to traditional third-party cookies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      Works with browser privacy features like ITP
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                When to Use Partitioned Cookies
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>
                    Third-party authentication and session management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>
                    Embedded services that need state per embedding site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>
                    Analytics services that respect user privacy preferences
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                Visual Comparison
              </h4>

              <div className="mb-6">
                <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                  Imagine <strong>tracker.com</strong> embedded on{' '}
                  <strong>site-a.com</strong> and{' '}
                  <strong>site-b.com</strong>:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                    <h5 className="mb-3 font-semibold text-red-900 dark:text-red-300">
                      Traditional Cookie
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded bg-white dark:bg-neutral-800 px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">
                          site-a.com
                        </span>
                        <span className="font-mono text-red-600 dark:text-red-400">
                          ✅ Same cookie
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-white dark:bg-neutral-800 px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">
                          site-b.com
                        </span>
                        <span className="font-mono text-red-600 dark:text-red-400">
                          ✅ Same cookie
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-red-700 dark:text-red-300">
                        ⚠️ Both sites read/write same cookie → tracking possible
                      </p>
                    </div>
                  </div>

                  <div className="rounded border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <h5 className="mb-3 font-semibold text-green-900 dark:text-green-300">
                      Partitioned Cookie
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded bg-white dark:bg-neutral-800 px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">
                          site-a.com
                        </span>
                        <span className="font-mono text-green-600 dark:text-green-400">
                          🟢 Cookie A
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-white dark:bg-neutral-800 px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">
                          site-b.com
                        </span>
                        <span className="font-mono text-green-600 dark:text-green-400">
                          🟢 Cookie B
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-green-700 dark:text-green-300">
                        ✓ Each site gets independent cookie → no tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4">
                <h5 className="mb-2 font-semibold text-sky-900 dark:text-sky-300">
                  Code Example
                </h5>
                <pre className="overflow-x-auto rounded bg-slate-900 p-4 text-sm">
                  <code className="font-mono text-slate-200">
                    {`// Set a partitioned cookie
await cookieStore.set({
  name: 'user_session',
  value: 'abc123',
  domain: '.tracker.com',
  path: '/',
  partitioned: true,  // ← Key property
  secure: true
});

// Cookie is scoped to top-level site
// - On site-a.com: creates independent cookie
// - On site-b.com: creates different independent cookie`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
              <h5 className="mb-2 font-semibold text-amber-900 dark:text-amber-300">
                Browser Support
              </h5>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Partitioned cookies are supported in Chrome 114+, Edge 114+, and Safari
                16.4+. Firefox is implementing support. Always check browser
                compatibility before using in production.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
