import * as React from 'react'
import AboutPageContent from '../content/about.mdx'

export default function AboutPage () {
  return (
    <>
      <div className="prose lg:prose-xl max-w-screen-xl mx-auto py-4 px-4">
        <AboutPageContent />
      </div>
    </>
  )
}
