'use client'
import { MouseEvent } from 'react'
import { SignInButton, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'

import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import Icon from '../basic/Icon'
import { useToggle } from '@/hooks'
import { useSpotifyUser } from '@/context'

import style from './Navigation.module.scss'

export default function UserMenu() {
  const { is, toggle } = useToggle()
  const { images } = useSpotifyUser()

  const renderIcon = () =>
    images?.[0] ? (
      <img
        className={style.spotifyUserIcon}
        src={images[0].url}
        alt="spotify user icon"
      />
    ) : (
      <Icon className={style.defaultUserIcon}>
        account_circle
      </Icon>
    )

  return (
      <div 
        className={style.UserMenu}
        onClick={toggle}
      >
        {renderIcon()}
        <NavDropdown isOpen={is}>
          <SignedIn>
            <NavLink href="/account ">account</NavLink>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </NavDropdown>
      </div>
  )
}
