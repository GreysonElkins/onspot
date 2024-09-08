import { useSpotifyUser } from '@/context'
import NoAccount from './NoAccount'
import Icon from '../basic/Icon'

import style from './SpotifyAccountCard.module.scss'

const Account: React.FC = () => {
  const { images, display_name, loading, requested } = useSpotifyUser()

  if (loading || !requested) return <div>loading...</div>

  if (!display_name) return <NoAccount />

  const renderIcon = () => {
    if (!images[1]) return <Icon>account_circle</Icon>
    return <img 
      src={images[1].url} 
      alt="Your Spotify profile picture" 
      className={style.profilePicture}  
    />
  }

  return <div>
    {renderIcon()}
    <h2>{display_name}</h2>
  </div>
  
}

export default Account
