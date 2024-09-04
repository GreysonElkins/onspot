import UserMenu from "./UserMenu"
import style from './Navigation.module.scss'

const Navigation: React.FC = () => {
  return (
    <nav className={style.Navigation}>
      <UserMenu />
    </nav>
  )
}

export default Navigation
