import SpotifyAccountCard from "@/components/SpotifyAccountCard"

import style from './Account.module.scss'

const Account = () => {
  return (
    <div className={style.Account}>
      <SpotifyAccountCard />
    </div>
  )
}

export default Account
