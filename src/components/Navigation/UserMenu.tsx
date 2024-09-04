'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'

import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import { IconButton } from '../basic/Buttons'
import { useToggle } from '@/hooks'

const Menu: React.FC = () => {
  const router = useRouter()
  const { isLoading, user } = useUser()
  const { is, toggle } = useToggle()

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
        disabled={isLoading}
      >
        account_circle
        <NavDropdown isOpen={is}>
          <NavLink href="/account ">
            account
          </NavLink>
          <NavLink href="/api/auth/logout ">
            Log Out
          </NavLink>
        </NavDropdown>
      </IconButton>  
    </>
  )
}

export default function UserMenu() { 
  return <div><Menu /></div>
}