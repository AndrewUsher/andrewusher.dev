// Astro sync uses a Vite dev server even during builds. Sentry's entry-point
// transforms require Rollup's isEntry, which Vite's dev server doesn't support.
export default function sentryViteCompat() {
  return {
    name: 'sentry-vite-entry-compat',
    configResolved(config) {
      for (const plugin of config.plugins) {
        if (
          !['sentry-astro-server-init', 'sentry-astro-server-release'].includes(plugin.name) ||
          typeof plugin.transform !== 'function'
        ) continue

        const transform = plugin.transform
        plugin.transform = function (...args) {
          if (this.environment.mode !== 'build') return null
          return transform.apply(this, args)
        }
      }
    },
  }
}
