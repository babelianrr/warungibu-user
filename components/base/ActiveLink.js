import React, {Children} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function ActiveLink({children, activeClassName, ...props}) {
  const router = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    router.asPath === props.href || router.asPath === props.as || router.query.product === props.href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}
