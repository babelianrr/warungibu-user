export default function HorizontalDivider({className, color = 'border-gray-400'}) {
  return <hr className={` ${color} mb-2 opacity-30 ${className}`} />
}
