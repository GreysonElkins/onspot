import * as crypto from 'node:crypto'
import { NextResponse, NextRequest } from "next/server"
import { auth } from '@clerk/nextjs/server'

import { spotifyConfigHttpError, noAuthHttpError, noLocalUserForSpotify } from '../../errors'
import Store from '../../store'
import axios from 'axios'

import { TokenResponse, storeToken, basicAuth } from './scripts'

export const GET = async (request: NextRequest) => {
  const { userId } = auth()
  if (!userId) return noAuthHttpError

  const { searchParams } = new URL(request.url || '')
  const code = searchParams.get('code')
  const state = searchParams.get('state') || undefined
  if (!code && !state) return getUserAuthentication()
  else if (!(await authStateIsAcceptable(state))) {
    return NextResponse.json(
      { error: 'The connection with Spotify is insecure at this time.' },
      { status: 403 }
    )
  } else if (code) {
    return getBearerToken(code)
  }
}

const getUserAuthentication = async () => {
  const { userId } = auth()
  if (!userId) return noAuthHttpError
  const { SPOTIFY_CLIENT_ID, NEXT_PUBLIC_BASE_URL } = process.env

  if (!SPOTIFY_CLIENT_ID || !NEXT_PUBLIC_BASE_URL) return spotifyConfigHttpError

  const state = crypto.randomBytes(16).toString('hex')
  Store.set('auth_state', state, userId)
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
    'playlist-read-collaborative'
  ].join(' ')
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: NEXT_PUBLIC_BASE_URL + '/api/spotify/authenticate',
    scope,
    state,
  })

  return NextResponse.redirect('https://accounts.spotify.com/authorize?' + params.toString())
}

const getBearerToken = async (code: string) => {
  const { NEXT_PUBLIC_BASE_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
  if (!NEXT_PUBLIC_BASE_URL || !SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) return spotifyConfigHttpError

  const { data } = await axios.post<TokenResponse>(
    'https://accounts.spotify.com/api/token',
    {
      code,
      redirect_uri: NEXT_PUBLIC_BASE_URL + '/api/spotify/authenticate',
      grant_type: 'authorization_code',
    },
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: basicAuth,
      },
    }
  )

  await storeToken(data)

  return NextResponse.redirect(NEXT_PUBLIC_BASE_URL)
}

const authStateIsAcceptable = async (final?: string) => {
  const { userId } = auth()
  if (!userId) throw noLocalUserForSpotify
  const original = await Store.get('auth_state', userId)
  return (typeof original === 'string' && original === final)
} 
