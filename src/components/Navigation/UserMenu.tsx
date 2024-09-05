'use client'
import { useRouter } from 'next/navigation'
import { 
  useSignIn, 
  SignInButton, 
  SignedIn, 
  SignedOut, 
  SignOutButton
} from '@clerk/nextjs'

import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import { IconButton } from '../basic/Buttons'
import { useToggle } from '@/hooks'
import style from './Navigation.module.scss'

const Menu: React.FC = () => {
  const router = useRouter()
  const { is, toggle } = useToggle()
  const { signIn } = useSignIn()
  const onClick = () => {

    // if (!user) router.push('/api/auth/login') 
  }

  const onHover = () => {
    // if (!!user) {
      toggle()
    // }
  }

  return (
    <>
      <IconButton 
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onHover} 
        // disabled={isLoading}
      >
        account_circle
        <NavDropdown isOpen={is}>
          <NavLink href="/account ">
            account
          </NavLink>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </NavDropdown>
      </IconButton>  
    </>
  )
}

export default function UserMenu() { 
  return <div><Menu /></div>
}