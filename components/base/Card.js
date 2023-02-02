export default function Card({className, children, padding = 'p-4', rounded = 'rounded-md', ...rest}) {
  return (
    <div className={`bg-white ${rounded} shadow ${padding} ${className}`} {...rest}>
      {children}
    </div>
  )
}
