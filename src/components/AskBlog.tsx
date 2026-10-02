import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowUpRightIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MAX_HISTORY_MESSAGES, MAX_QUESTION_LENGTH } from '../features/ask-blog/config'
import { readChatStream } from '../features/ask-blog/client-stream'
import type { ChatEvent, ChatMessage, ChatSource } from '../features/ask-blog/types'
import '../features/ask-blog/widget.css'

interface DisplayMessage extends ChatMessage {
  id: string
  html?: string
  sources?: ChatSource[]
}

const STARTERS = ['How do I replace document.cookie?', 'What has Andrew written about dependency management?']

function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return
  const controls = [...event.currentTarget.querySelectorAll<HTMLElement>(
    'button:not(:disabled), a[href], textarea:not(:disabled), summary, [tabindex="0"]'
  )].filter(element => element.getClientRects().length > 0)
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

export function AskBlog() {
  const [available, setAvailable] = useState(false)
  const [onBlog, setOnBlog] = useState(false)
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const launcher = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const conversation = useRef<HTMLDivElement>(null)
  const active = useRef<AbortController | null>(null)

  useEffect(() => {
    let mounted = true
    const refresh = async () => {
      const visible = document.body.dataset.blogChat === 'true'
      setOnBlog(visible)
      if (!visible) setOpen(false)
      try {
        const response = await fetch('/api/ask-blog', { cache: 'no-store' })
        const data = await response.json() as { enabled?: boolean }
        if (!mounted) return
        const enabled = response.ok && data.enabled === true
        setAvailable(enabled)
        if (!enabled) { setOpen(false); active.current?.abort() }
      } catch {
        if (mounted) {
          setAvailable(false)
          setOpen(false)
          active.current?.abort()
        }
      }
    }
    const navigate = () => { setOpen(false); dialog.current?.close() }
    void refresh()
    document.addEventListener('astro:page-load', refresh)
    document.addEventListener('astro:before-swap', navigate)
    return () => {
      mounted = false
      active.current?.abort()
      document.removeEventListener('astro:page-load', refresh)
      document.removeEventListener('astro:before-swap', navigate)
    }
  }, [])

  useEffect(() => {
    if (open && available && onBlog) {
      dialog.current?.showModal()
      input.current?.focus()
    } else if (dialog.current?.open) {
      dialog.current.close()
      launcher.current?.focus()
    }
  }, [open, available, onBlog])

  useEffect(() => {
    const element = conversation.current
    if (element && element.scrollHeight - element.scrollTop - element.clientHeight < 180) element.scrollTop = element.scrollHeight
  }, [messages, busy])

  const updateAnswer = (id: string, event: ChatEvent) => {
    setMessages(current => current.map(message => {
      if (message.id !== id) return message
      switch (event.type) {
        case 'sources': return { ...message, sources: event.sources }
        case 'delta': return { ...message, content: message.content + event.text }
        case 'done': return { ...message, html: event.html }
        case 'error': return { ...message, content: event.message }
      }
    }))
    if (event.type === 'done') setStatus('Answer ready. Sources are listed below the answer.')
    if (event.type === 'error') setError(event.message)
  }

  const ask = async (value: string) => {
    const text = value.trim()
    if (!text || text.length > MAX_QUESTION_LENGTH || active.current) return
    const controller = new AbortController()
    active.current = controller
    const user: DisplayMessage = { id: crypto.randomUUID(), role: 'user', content: text }
    const answer: DisplayMessage = { id: crypto.randomUUID(), role: 'assistant', content: '' }
    const history = messages.filter(message => message.content.trim()).slice(-MAX_HISTORY_MESSAGES).map(({ role, content }) => ({ role, content: content.slice(0, role === 'user' ? MAX_QUESTION_LENGTH : 4_000) }))
    setMessages(current => [...current, user, answer])
    setQuestion('')
    setBusy(true)
    setError('')
    setStatus('Searching the posts and preparing an answer…')
    try {
      const response = await fetch('/api/ask-blog', {
        method: 'POST', signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: text }] }),
      })
      if (!response.ok) {
        const data = await response.json() as { error?: string }
        if (response.status === 404) { setAvailable(false); setOpen(false) }
        throw new Error(data.error || 'Blog chat is unavailable. Please try again.')
      }
      if (!response.body) throw new Error('The response was empty. Please try again.')
      await readChatStream(response.body, event => updateAnswer(answer.id, event))
    } catch (cause) {
      const message = controller.signal.aborted ? 'Answer stopped.' : cause instanceof Error ? cause.message : 'Something went wrong. Please try again.'
      setError(message)
      setStatus(message)
      setMessages(current => current.map(item => item.id === answer.id && !item.content ? { ...item, content: message } : item))
    } finally {
      active.current = null
      setBusy(false)
    }
  }

  return (
    <div hidden={!available || !onBlog} className="ask-blog">
      <button
        ref={launcher}
        type="button"
        className="ask-blog-launcher"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="ask-blog-dialog"
        onClick={() => setOpen(true)}
      >
        <ChatBubbleLeftRightIcon aria-hidden="true" className="h-5 w-5" />
        <span>Ask my blog</span>
      </button>
      <dialog
        ref={dialog}
        id="ask-blog-dialog"
        aria-labelledby="ask-blog-title"
        aria-describedby="ask-blog-disclaimer"
        className="ask-blog-dialog"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onKeyDown={trapFocus}
      >
        <header className="ask-blog-header">
          <div>
            <p className="ask-blog-eyebrow">From the archives</p>
            <h2 id="ask-blog-title">Ask my blog<span aria-hidden="true">.</span></h2>
          </div>
          <button
            type="button"
            className="ask-blog-icon-button"
            aria-label="Close blog chat"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>
        <p id="ask-blog-disclaimer" className="ask-blog-disclaimer">Answers from Andrew’s published posts. AI answers can be wrong; check the sources. Questions and recent conversation are sent to OpenAI. Transcripts aren’t saved by this site.</p>
        <div
          ref={conversation}
          className="ask-blog-conversation"
          role="log"
          aria-label="Conversation"
          aria-live="off"
          tabIndex={0}
        >
          {messages.length === 0 ? (
            <section className="ask-blog-welcome">
              <p className="ask-blog-eyebrow">Less scrolling. More finding.</p>
              <h3>Find the paragraph<br />you came for.</h3>
              <p>Ask a technical question, get the short version, or follow an idea back to its source.</p>
              <div className="ask-blog-starters">
                {STARTERS.map(starter => (
                  <button key={starter} type="button" onClick={() => void ask(starter)}>
                    {starter}
                    <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </button>
                ))}
              </div>
            </section>
          ) : messages.map(message => (
            <article key={message.id} className={`ask-blog-message ask-blog-${message.role}`}>
              <p className="ask-blog-eyebrow">{message.role === 'user' ? 'You' : 'From the blog'}</p>
              {message.html ? (
                // Only the server's constrained Markdown/Shiki renderer supplies HTML.
                <div className="ask-blog-markdown" dangerouslySetInnerHTML={{ __html: message.html }} />
              ) : (
                <p className="ask-blog-plaintext">{message.content || 'Looking through the posts…'}</p>
              )}
              {message.sources?.length ? (
                <details className="ask-blog-sources" open={!busy && Boolean(error)}>
                  <summary>{message.sources.length} source excerpts</summary>
                  <ol>
                    {message.sources.map(source => (
                      <li key={source.number}>
                        <a href={source.url} onClick={() => setOpen(false)}>
                          <span>[{source.number}] {source.title}</span>
                          <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                        </a>
                        <p className="ask-blog-source-heading">{source.heading}</p>
                        <p className="ask-blog-excerpt">{source.excerpt}</p>
                      </li>
                    ))}
                  </ol>
                </details>
              ) : null}
            </article>
          ))}
        </div>
        <footer className="ask-blog-composer">
          {error ? <p className="ask-blog-error">{error}</p> : null}
          <p className="sr-only" role="status" aria-live="polite">{status}</p>
          <form onSubmit={event => { event.preventDefault(); void ask(question) }}>
            <label htmlFor="ask-blog-question" className="sr-only">Your question about the blog</label>
            <textarea
              ref={input}
              id="ask-blog-question"
              rows={2}
              maxLength={MAX_QUESTION_LENGTH}
              value={question}
              onChange={event => setQuestion(event.target.value)}
              placeholder="What would you like to find?"
              disabled={busy}
            />
            {busy ? (
              <button
                type="button"
                className="ask-blog-send"
                aria-label="Stop answer"
                onClick={() => active.current?.abort()}
              >
                <span aria-hidden="true">■</span>
              </button>
            ) : (
              <button
                type="submit"
                className="ask-blog-send"
                aria-label="Send question"
                disabled={!question.trim()}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            )}
          </form>
          <div className="ask-blog-composer-meta">
            <span>{question.length.toLocaleString()} / 2,000 · 10 questions / hour</span>
            <button
              type="button"
              disabled={busy || !messages.length}
              onClick={() => {
                setMessages([])
                setError('')
                setStatus('Conversation cleared.')
                input.current?.focus()
              }}
            >
              Clear chat
            </button>
          </div>
        </footer>
      </dialog>
    </div>
  )
}
