import { useState } from 'react'
import { motion } from 'framer-motion'

interface CodePreviewProps {
  code: string
  language?: 'javascript' | 'typescript'
  showCopy?: boolean
}

export default function CodePreview({
  code,
  language = 'javascript',
  showCopy = true,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="dark:border-neutral-700 dark:bg-neutral-900 my-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      <div className="dark:border-neutral-700 dark:bg-neutral-800 flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2">
        <span className="font-mono dark:text-slate-400 text-xs font-medium text-slate-600">
          {language}
        </span>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="dark:text-slate-400 dark:hover:text-sky-400 flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-sky-600"
          >
            {copied ? (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="overflow-x-auto p-4 text-sm"
      >
        <code className="font-mono dark:text-slate-200 text-slate-800">
          {code}
        </code>
      </motion.pre>
    </div>
  )
}
