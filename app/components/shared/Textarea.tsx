import * as React from 'react'

type TextAreaProps = React.HTMLAttributes<HTMLTextAreaElement> & {
  label: string
  id: string
  required?: boolean
}

const TextArea = ({ label, id, ...rest }: TextAreaProps) => {
  return (
    <div className="relative mb-8 h-32">
      <label
        htmlFor={id}
        className="absolute top-3 left-3 text-xs font-medium text-gray-500"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className="absolute inset-0 w-full rounded-lg border-gray-200 bg-transparent px-3 pb-3 pt-9 dark:text-white sm:text-sm"
        {...rest}
      />
    </div>
  )
}

export { TextArea }
