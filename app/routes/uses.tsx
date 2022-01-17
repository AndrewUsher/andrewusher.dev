import * as React from 'react'
import UsesPageContent from '../content/uses.mdx'

export default function AboutPage () {
  return (
    <>
      <div className="prose lg:prose-xl max-w-screen-xl mx-auto py-12 px-4 dark:prose-invert">
        <UsesPageContent />
      </div>
    </>
  )
}
