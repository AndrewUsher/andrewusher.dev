import * as React from 'react'
import AboutPageContent from '../content/about.mdx'

export default function AboutPage() {
  return (
    <>
      <div className="prose mx-auto min-h-[80vh] max-w-screen-xl p-8 dark:prose-invert lg:prose-xl">
        <AboutPageContent />
      </div>
    </>
  )
}
