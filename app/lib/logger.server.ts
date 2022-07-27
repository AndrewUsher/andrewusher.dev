import pino from 'pino'
import pretty from 'pino-pretty'

export const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'error',
})
