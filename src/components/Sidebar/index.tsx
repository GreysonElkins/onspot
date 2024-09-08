'use client'

import style from './Sidebar.module.scss'
import NavLink from '../Navigation/NavLink'
import Playlists from './Playlists'

const Sidebar = () => {
  return (
    <div className={style.Sidebar}>
      <NavLink href='/liked-songs'>Liked Songs</NavLink>
      <hr />
      <Playlists />
    </div>
  )
}

export default Sidebar
