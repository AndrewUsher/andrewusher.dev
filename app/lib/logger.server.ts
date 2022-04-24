import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  colorize: true,
  translateTime: false
})

export const logger = pino({ level: process.env.PINO_LOG_LEVEL || 'error' }, stream)
