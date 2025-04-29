import * as React from 'react'
import { useFetcher } from '@remix-run/react'
import { ActionFunction, json } from '@remix-run/server-runtime'
import { Input } from '~/components/shared/Input/Input'
import { TextArea } from '~/components/shared/Textarea'
import { addContactToTable } from '~/lib/airtable.server'

type MaybeErrors = {
  body?: string
  email?: string
  name?: string
  subject?: string
}

type SubmissionFields = {
  body?: string | null
  email?: string | null
  name?: string | null
  subject?: string | null
}

const blockList = ['crytowar']

function validateContactFormSubmission({
  body,
  email,
  name,
  subject,
}: SubmissionFields) {
  const errors: MaybeErrors = {}
  if (!body) {
    errors.body = 'Message is required'
  }
  if (!email) {
    errors.email = 'Email is required'
  }
  if (!name) {
    errors.name = 'Name is required'
  }
  if (!subject) {
    errors.subject = 'Subject is required'
  }

  if (blockList.includes(name?.toLowerCase() || '')) {
    throw new Error('User is blocked from sending contact')
  }
  return Object.keys(errors).length ? errors : null
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const body = formData.get('body') as string | null
    const email = formData.get('email') as string | null
    const name = formData.get('name') as string | null
    const subject = formData.get('subject') as string | null
    const errors = validateContactFormSubmission({ body, email, name, subject })
    if (errors) {
      console.error(errors)
    }
    await addContactToTable({ body, email, name, subject })
    return json({ success: true })
  } catch (err) {
    console.error('Error when sending to table', err)
  }
}

export default function ContactRoute() {
  const fetcher = useFetcher()
  const submitted = fetcher.type === 'done' && fetcher.data?.success === true

  return (
    <main className="mx-auto max-w-(--breakpoint-md) p-8">
      <section className="prose mb-8 dark:prose-invert">
        <p>How can I help you?</p>
        <p>
          If you want us to work together on a project, or have any questions
          about what I do, don&apos;t hesitate to write me.
        </p>
        <p>Here are a few tips on writing me:</p>
        <ul>
          <li>Use paragraphs, avoid large walls of text.</li>
          <li>Number your asks if there are multiple</li>
          <li>Keep it as short as you can</li>
          <li>
            Post code on a git repo, Codepen or smaller stuff or errors in a
            Gist. Screenshots are helpful too!
          </li>
        </ul>
      </section>
      <fetcher.Form method="post">
        <Input label="Name" id="name" required />
        <Input label="Email" id="email" required />
        <Input label="Subject" id="subject" required />
        <TextArea label="Body" id="body" required />
        {submitted ? (
          <p className="border-l-8 border-l-sky-500 bg-sky-200/50 p-4 dark:border-l-yellow-400 dark:bg-sky-700 dark:text-white">
            Email sent! I&apos;ll be in touch soon!
          </p>
        ) : (
          <button
            className="group relative mb-12 inline-block"
            type="submit"
            disabled={fetcher.state === 'submitting'}
          >
            <span className="absolute inset-0 translate-x-2 translate-y-2 transform bg-blue-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 dark:bg-blue-700"></span>
            <span className="relative inline-block border-2 border-black px-5 py-3 font-bold uppercase tracking-widest dark:border-white dark:text-white">
              Send Message
            </span>
          </button>
        )}
      </fetcher.Form>
    </main>
  )
}
