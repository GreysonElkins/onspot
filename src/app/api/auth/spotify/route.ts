import * as crypto from 'node:crypto'
import { NextResponse } from "next/server"
import { NextApiRequest } from 'next'

import Store from '../../store'
import axios from 'axios'

const getUserAuthentication = async (request: NextApiRequest) => {
  const { SPOTIFY_CLIENT_ID, BASE_URL } = process.env

  if (!SPOTIFY_CLIENT_ID || !BASE_URL) return NextResponse.json(
    { error: 'The API is not configured to authenticate with Spotify' }, 
    { status: 500 }
  )

  const state = crypto.randomBytes(16).toString('hex')
  Store.set('auth_state', state, 'spotify')
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
    redirect_uri: BASE_URL + '/api/auth/spotify',
    scope,
    state,
  })

  return NextResponse.redirect('https://accounts.spotify.com/authorize?' + params.toString())
}

type TokenResponse = {
  [key: string]: string | number
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

const getBearerToken = async (code: string) => {
  const { BASE_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
  if (!BASE_URL || !SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) return NextResponse.json(
    { error: "The API is not configured to authenticate with Spotify" },
    { status: 500 }
  )
  const { data } = await axios.postForm<TokenResponse>('https://accounts.spotify.com/api/token', {
    code,
    redirect_uri: BASE_URL + '/account',
    grant_type: 'authorization_code' 
  }, { headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
  }}
  )

  const storedResponse = Object.keys(data).map(async (key) => {
    await Store.set(key, String(data[key]), 'spotify')
  })

  await Promise.all(storedResponse)

  return NextResponse.redirect('/')
}

const authStateIsAcceptable = async (final?: string) => {
  const original = await Store.get('auth_state', 'spotify')
  return (typeof original === 'string' && original === final)
} 

export const GET = async (request: NextApiRequest) => {
  const { searchParams } = new URL(request.url || '')
  const code = searchParams.get('code')
  const state = searchParams.get('state') || undefined
  if (!code && !state) return getUserAuthentication(request)
  else if (!await authStateIsAcceptable(state)) {
    return NextResponse.json(
      { error: "The connection with Spotify is insecure at this time." }, 
      { status: 403 })
  } else if (code) {
    return getBearerToken(code)
  }
}
