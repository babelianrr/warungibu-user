import React from 'react'

export default function GrayBorderButton({
  children,
  className,
  as = 'button',
  hoverState = true,
  onClick = () => {},
  display = 'flex',
  hoverColor = 'hover:bg-gray-700',
  padding = 'py-1 px-2',
  alignment = 'items-center',
}) {
  return React.createElement(
    as,
    {
      className: `border border-gray-300 ${padding} rounded-md ${display} space-x-1 ${alignment} text-gray-700 cursor-pointer ${
        hoverState ? `${hoverColor} hover:text-white` : ''
      } transition-colors ease-in-out ${className}`,
      onClick,
    },
    children
  )

  return (
    <as
      className={`border border-gray-500 py-1 px-2 rounded-md flex space-x-1 items-center text-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white transition-colors ease-in-out ${className}`}
    >
      {children}
    </as>
  )
}
