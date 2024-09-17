import { auth } from '@clerk/nextjs/server'

import Store from '../../store'
import { noLocalUserForSpotify } from '../../errors'

export const basicAuth = 'Basic ' + btoa(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)


export type TokenResponse = {
  [key: string]: string | number
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

export const storeToken = async (data: TokenResponse) => {
  const { userId } = auth()
  if (!userId) throw noLocalUserForSpotify
  const storedResponse = Object.keys(data).map(async (key) => {
    await Store.set(key, String(data[key]), userId)
  })

  return await Promise.all(storedResponse)
}