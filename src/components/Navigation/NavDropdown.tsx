import { PropsWithChildren } from 'react'

import style from './Navigation.module.scss'

interface Props extends PropsWithChildren {
  isOpen: boolean
}

const NavDropdown: React.FC<Props> = ({ isOpen, children }) => (
  <menu className={`${style['nav-dropdown']} ${isOpen ? style.open : style.closed}`}>{children}</menu>
)

export default NavDropdown
