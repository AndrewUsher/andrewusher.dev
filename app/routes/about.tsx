import * as React from 'react'
import AboutPageContent from '../content/about.mdx'

export default function AboutPage () {
  return (
    <>
      <div className="prose lg:prose-xl max-w-screen-xl mx-auto p-8 dark:prose-invert min-h-[80vh]">
        <AboutPageContent />
      </div>
    </>
  )
}
