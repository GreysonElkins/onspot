import { auth } from '@clerk/nextjs/server'
import { NoLocalUserForSpotify } from '../../errors'

import Store from '../../store'

const getSpotifyToken = async () => {
  const { userId } = auth()
  if (!userId) throw NoLocalUserForSpotify
  return await Store.get('access_token', userId)
}

export default getSpotifyToken
