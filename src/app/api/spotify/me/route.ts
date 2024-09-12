import axios from 'axios'
import { NextResponse } from 'next/server'

import { noAuthHttpError, NoLocalUserForSpotify } from '../../errors'
import { refreshAndTryAgain } from '../../spotify/authenticate/refresh'
import getSpotifyToken from '../../spotify/authenticate/getSpotifyToken'

export const GET = async () => {
  try {
    const token = await getSpotifyToken()
    if (typeof token !== 'string') return token
    const getUser = async () =>
      await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

    try {
      const res = await getUser()
      return NextResponse.json(res.data)
    } catch {
      const retry = await refreshAndTryAgain(getUser)
      return NextResponse.json(retry.data)
    }
  } catch (error) {
    if (error instanceof NoLocalUserForSpotify) {
      return noAuthHttpError
    }
    return NextResponse.json({ error }, { status: 500 })
  }
}
