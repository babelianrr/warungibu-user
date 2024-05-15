export function SmallInformation({children}) {
  return <p className="text-sm text-gray-700 leading-6 mb-4">{children}</p>
}

export function ExtraSmallInformation({children, className}) {
  return <span className={`text-xs text-gray-500 leading-none`}>{children}</span>
}
