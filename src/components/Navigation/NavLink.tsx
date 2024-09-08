'use client'

import React, { PropsWithChildren } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import style from './Navigation.module.scss'

interface Props extends PropsWithChildren {
  href: string
}

const NavLink: React.FC<Props> = ({ children, href }) => {
  const pathname = usePathname()

  const className = pathname === href ?
    `${style.NavLink} ${style.active}`
    : style.NavLink

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default NavLink
