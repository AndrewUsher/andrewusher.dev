import * as React from 'react'

const TextArea = ({ label, id, ...rest }: React.HTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="relative h-32 mb-8">
      <label
        htmlFor={id}
        className="absolute text-xs font-medium text-gray-500 top-3 left-3"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className="absolute inset-0 w-full px-3 pb-3 bg-transparent border-gray-200 rounded-lg sm:text-sm pt-9 dark:text-white"
        {...rest}
      />
    </div>
  )
}

export { TextArea }
