import * as React from 'react'

const Input = ({ label, id, ...rest }: React.HTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative h-16 mb-8">
      <label
        htmlFor={id}
        className="absolute text-xs font-medium text-gray-500 top-3 left-3"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        className="absolute inset-0 w-full px-3 pb-3 bg-transparent border-gray-200 rounded-lg sm:text-sm pt-9"
        type="text"
        {...rest}
      />
    </div>
  )
}

export { Input }
