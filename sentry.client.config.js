import * as Sentry from '@sentry/astro'

Sentry.init({
  dsn: 'https://66ffda4577e82f30fb33bddc5a01ec07@o4504130964553728.ingest.us.sentry.io/4510621602283520',
  sendDefaultPii: true,
  enableLogs: true,
})
