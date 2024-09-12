import axios, { AxiosResponse } from "axios"
import { auth } from '@clerk/nextjs/server'

import { noLocalUserForSpotify } from '../../errors'
import Store from "../../store"
import { basicAuth, TokenResponse, storeToken } from "./route"

const refresh = async () => {
  const { userId } = auth()
  if (!userId) throw noLocalUserForSpotify
  const refresh_token = await Store.get('refresh_token', userId)

  const { data } = await axios.post<TokenResponse>('https://accounts.spotify.com/api/token', {
    grant_type: 'refresh_token',
    refresh_token
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicAuth
    },
  })

  return await storeToken(data)  
}

export const refreshAndTryAgain = async (
  tryAgain: () => Promise<AxiosResponse<any,any>>
) => {
  await refresh()
  return await tryAgain()
} 
