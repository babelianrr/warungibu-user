export default function Header({text, className}) {
  return (
    <h2 className={`text-lg sm:text-lg leading-none text-gray-900 font-sans font-normal ${className}`}>{text}</h2>
  )
}
