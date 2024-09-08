'use client'

import { usePaginatedApi } from "@/hooks"
import { PlaylistResponse } from "@/types/Spotify"
import Icon from "../basic/Icon"
import { useSpotifyUser } from "@/context"

import style from './Sidebar.module.scss'

const Playlists = () => {
  const { display_name } = useSpotifyUser()
  const { data } = usePaginatedApi<PlaylistResponse>({
    url: process.env.NEXT_PUBLIC_BASE_URL + '/api/spotify/me/playlists',
    limit: 50,
  })

  const ownerIcon = (name: string) => {
    switch (name) {
      case('Spotify'): return 'robot'
      case(display_name): return 'face'
      default: return ''
    }
  }

  const playlists = data?.items.map(({ name, id, public: pub, owner, collaborative }) => (
    <div key={`playlist-${id}`} className={style.Playlist}>
      { name }
      <div className="icons">
        <Icon>{ownerIcon(owner.display_name)}</Icon>
        <Icon>{pub ? 'Public' : 'Lock' }</Icon>
        {collaborative && <Icon>groups</Icon>}
      </div>
    </div>
  )) || []

  return (
    <>
      <button>by you</button>
      <button>public</button>
      <div className={style.Playlists}>
        {playlists}
      </div>
    </>
  )
}

export default Playlists
