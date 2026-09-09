/**
 * TODO: Implement per spec in content/blog/geolocation-element.mdx:Demo 1
 * Side-by-side: navigator.geolocation vs <geolocation> — permission re-prompt diff.
 * Spec: see refined demo specs (comparison demo) in conversation.
 */
export default function GeolocationComparisonDemo() {
  const isSupported =
    typeof window !== 'undefined' &&
    typeof (window as unknown as { HTMLGeolocationElement?: unknown })
      .HTMLGeolocationElement === 'function'
  return (
    <div className="my-8 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
      <p className="text-sm text-amber-900 dark:text-amber-200">
        GeolocationComparisonDemo placeholder — implementation pending.
      </p>
      <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
        Supported: {String(isSupported)} — See spec in MDX for side-by-side logic.
      </p>
    </div>
  )
}
