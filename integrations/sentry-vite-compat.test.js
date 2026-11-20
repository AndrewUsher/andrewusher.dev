import { describe, expect, test, vi } from 'vitest'
import sentryViteCompat from './sentry-vite-compat.mjs'

describe('Sentry Vite compatibility', () => {
  test.each(['sentry-astro-server-init', 'sentry-astro-server-release'])(
    'runs %s transforms only in build environments',
    (name) => {
      const originalTransform = vi.fn(function (code, id, options) {
        return { code, id, options, context: this }
      })
      const sentryPlugin = { name, transform: originalTransform }
      const otherPlugin = { name: 'other-plugin', transform: vi.fn() }
      sentryViteCompat().configResolved({ plugins: [sentryPlugin, otherPlugin] })

      const devContext = { environment: { mode: 'dev' } }
      expect(sentryPlugin.transform.call(devContext, 'code', 'id', { ssr: true })).toBeNull()
      expect(originalTransform).not.toHaveBeenCalled()

      const buildContext = { environment: { mode: 'build' } }
      expect(sentryPlugin.transform.call(buildContext, 'code', 'id', { ssr: true })).toEqual({
        code: 'code', id: 'id', options: { ssr: true }, context: buildContext,
      })
      expect(originalTransform).toHaveBeenCalledOnce()
      expect(otherPlugin.transform).not.toHaveBeenCalled()
    },
  )
})
