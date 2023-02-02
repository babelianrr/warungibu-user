export default function HeaderBorderButton({children, className, ...rest}) {
  return (
    <button
      className={`border border-gray-300 py-2 px-3 rounded-md flex items-center text-gray-500 cursor-pointer hover:bg-dnr-turqoise hover:text-white transition-colors ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
