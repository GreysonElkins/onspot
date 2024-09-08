'use client'

import Account from './Account'

import style from './SpotifyAccountCard.module.scss'


const SpotifyAccountCard = () => {
  return (
    <div className={style.Account}>
      <h2>Spotify</h2>
      <hr />
      <Account />
    </div>
  )
}

export default SpotifyAccountCard
