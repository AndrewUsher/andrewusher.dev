import React from 'react'
import { renderToString } from 'react-dom/server'
import type { EntryContext } from '@remix-run/react'
import { RemixServer } from '@remix-run/react'
import { logger } from './lib/logger.server'

if (process.env.ENABLE_MSW === 'true') {
  import('./msw/server').then(({ server }) => {
    server.listen()
  })
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  logger.debug(
    `${request.method} request made to ${request.url} - Status code: ${responseStatusCode}`
  )

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set('X-Frame-Options', 'DENY')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
