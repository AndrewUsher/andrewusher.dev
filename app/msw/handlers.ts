import { rest } from 'msw'
import { logger } from '~/lib/logger.server'

export const handlers = [
  rest.get('*', (req) => {
    logger.debug({
      msg: `MSW :: Request for ${req.url.href}`,
      params: req.url.search,
    })

    return req.passthrough()
  }),
]
