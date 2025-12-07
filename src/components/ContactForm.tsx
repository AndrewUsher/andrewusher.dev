import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      method="POST"
      data-vercel-form="contact"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="dark:text-white mb-2 block font-semibold"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="dark:text-white mb-2 block font-semibold"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="dark:text-white mb-2 block font-semibold"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="dark:text-white mb-2 block font-semibold"
        >
          Message
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          className="dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full rounded border border-gray-300 px-4 py-2"
        />
      </div>

      {submitted && (
        <div className="dark:border-l-yellow-400 dark:bg-sky-700 dark:text-white border-l-8 border-l-sky-500 bg-sky-200/50 p-4">
          Message sent! I&apos;ll be in touch soon!
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="dark:bg-sky-500 dark:hover:bg-sky-600 rounded bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
