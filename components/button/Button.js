export default function Button({
  children,
  onClick,
  className,
  type,
  padding = 'py-3 px-3',
  color = 'primary',
  bgHover = true,
  ...rest
}) {
  const colors = {
    orange: 'border-dnr-dark-orange text-dnr-dark-orange hover:bg-dnr-dark-orange',
    primary: `border-wi-blue text-wi-blue ${bgHover && 'hover:bg-wi-blue'}`,
    turqoise: 'border-dnr-dark-turqoise text-dnr-dark-turqoise hover:bg-dnr-dark-turqoise',
  }

  if (type === 'border') {
    return (
      <button
        className={`bg-white border ${colors[color]} rounded-md shadow ${padding} flex items-center justify-center  focus:outline-none hover:text-white ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (type === 'disabled') {
    return (
      <button
        className={`border bg-gray-300 text-white cursor-not-allowed rounded-md ${padding} flex items-center justify-center  focus:outline-none ${className}`}
        onClick={onClick}
        disabled
      >
        {children}
      </button>
    )
  }

  if (type === 'processing') {
    return (
      <button
        className={`border bg-gray-300 text-white cursor-not-allowed rounded-md ${padding} flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
        onClick={onClick}
        disabled
      >
        {/* TODO, bisa diganti jadi loading nanti */}
        Memproses Request
      </button>
    )
  }

  return (
    <button
      className={`bg-wi-blue rounded-md shadow ${padding} flex items-center justify-center text-white focus:outline-none ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.PROCESSING = 'processing'
