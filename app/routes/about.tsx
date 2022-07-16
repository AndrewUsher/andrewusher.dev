import * as React from 'react'
import AboutPageContent from '../content/about.mdx'
import { timelineData } from '../content/timeline'

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto min-h-[80vh] max-w-screen-xl p-8">
        <div className="prose mb-8 max-w-screen-xl dark:prose-invert lg:prose-xl">
          <AboutPageContent />
        </div>
        <ol className="relative border-l border-emerald-400 dark:border-emerald-600">
          {timelineData.map((entry) => (
            <li className="mb-10 ml-4" key={entry.heading}>
              <div className="dark:bg-blue-6 00 absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-blue-400  dark:border-gray-900"></div>
              <time className="mb-2 block text-lg font-bold leading-none text-blue-400">
                {entry.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {entry.heading}
              </h3>
              {entry.description && (
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {entry.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
