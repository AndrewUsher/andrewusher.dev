import * as React from 'react'
import { ActionFunction, json, useFetcher } from 'remix'
import { Input } from '~/components/shared/Input/Input'
import { TextArea } from '~/components/shared/Textarea'
import { addContactToTable } from '~/lib/airtable.server'

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const body = formData.get('body')
    const email = formData.get('email')
    const name = formData.get('name')
    const subject = formData.get('subject')
    await addContactToTable({ body, email, name, subject })
    return json({ success: true })
  } catch (err) {
    console.error('Error when sending to table', err)
  }
}

export default function ContactRoute () {
  const fetcher = useFetcher()
  const submitted = fetcher.type === 'done' && fetcher.data?.success === true

  return (
    <main className="max-w-screen-md mx-auto py-4 px-4">
      <section className="prose dark:prose-invert mb-8">
        <p>How can I help you?</p>
        <p>
          If you want us to work together on a project,
          or have any questions about what I do, don&apos;t hesitate to write me.
        </p>
        <p>Here are a few tips on writing me:</p>
        <ul>
          <li>Use paragraphs, avoid large walls of text.</li>
          <li>Number your asks if there are multiple</li>
          <li>Keep it as short as you can</li>
          <li>Post code on a git repo, Codepen or smaller stuff or errors in a Gist. Screenshots are helpful too!</li>
        </ul>
      </section>
      <fetcher.Form method="post">
        <Input label="Name" id="name" required />
        <Input label="Email" id="email" required />
        <Input label="Subject" id="subject" required />
        <TextArea label="Body" id="body" required />
        {submitted ? (
          <p className="bg-sky-200/50 dark:bg-sky-700 border-l-8 border-l-sky-500 dark:border-l-yellow-400 dark:text-white p-4">Email sent! I&apos;ll be in touch soon!</p>
        ) : (
          <button className="relative inline-block group mb-12" type="submit" disabled={fetcher.state === 'submitting'}>
            <span className="absolute inset-0 bg-blue-300 dark:bg-blue-700 transition-transform transform translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative inline-block px-5 py-3 font-bold tracking-widest uppercase border-2 border-black dark:text-white dark:border-white">
            Send Message
            </span>
          </button>
        )}
      </fetcher.Form>
    </main>
  )
}
