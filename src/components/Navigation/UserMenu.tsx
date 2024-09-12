'use client'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'

import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import Icon from '../basic/Icon'
import { useModal, useToggle } from '@/hooks'
import { useSpotifyUser } from '@/context'

import style from './Navigation.module.scss'

export default function UserMenu() {
  const { is, toggle } = useToggle()
  const { images } = useSpotifyUser()
  const { Modal, open } = useModal()

  const renderIcon = () =>
    images?.[0] ? (
      <Image
        className={style['spotify-user-icon']}
        src={images[0].url}
        alt="spotify user icon"
      />
    ) : (
      <Icon className={style['default-user-icon']}>
        account_circle
      </Icon>
    )

  return (
    <>
    <div 
        className={style.UserMenu}
        onClick={e => e.preventDefault()}
      >
        <button
          className={style['nav-open-button']}
          onClick={open}
        >
          {renderIcon()}
        </button>
      </div>
      <Modal className={style['user-modal']}>
        <div className={style['nav-menu']}>
          <SignedIn>
            <NavLink href="/account ">account</NavLink>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </Modal>
    </>
  )
}
