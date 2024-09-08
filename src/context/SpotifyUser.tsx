"use client"
import { createContext, PropsWithChildren, useEffect, useContext } from 'react'

import { useServer } from '@/hooks'
import { SpotifyUser as User } from '@/types/Spotify'

interface Context extends User {
  loading: boolean
  requested: boolean
}

const SpotifyUserContext = createContext({} as Context)

const SpotifyUser: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: isAuthorized, loading, requested } = useServer<boolean>({ url: '/api/spotify/isAuthenticated' })
  const {
    data: spotifyUser,
    call,
  } = useServer<User>({ url: '/api/spotify/me', onRender: false })

  useEffect(() => {
    isAuthorized && call()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized])

  return (
    <SpotifyUserContext.Provider value={
      { ...spotifyUser, loading, requested } as Context}>
      {children}
    </SpotifyUserContext.Provider>
  )
}

export const useSpotifyUser = () => useContext(SpotifyUserContext)

export default SpotifyUser
