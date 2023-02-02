import Link from 'next/link'

export default function NavLink({children, aClassName, ...rest}) {
  return (
    <Link {...rest}>
      <a className={aClassName}>{children}</a>
    </Link>
  )
}
