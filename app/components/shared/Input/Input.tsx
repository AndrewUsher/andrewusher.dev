import * as React from 'react'

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  required?: boolean
}

const Input = ({ label, id, ...rest }: InputProps) => {
  return (
    <div className="relative mb-8 h-16">
      <label
        htmlFor={id}
        className="absolute top-3 left-3 text-xs font-medium text-gray-500"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        className="absolute inset-0 w-full rounded-lg border-gray-200 bg-transparent px-3 pb-3 pt-9 dark:text-white sm:text-sm"
        type="text"
        {...rest}
      />
    </div>
  )
}

export { Input }
