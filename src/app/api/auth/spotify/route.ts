import { NextResponse } from "next/server"

export const GET = () => {
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
    'playlist-read-collaborative'
  ].join(' ')
  const baseUrl = process.env.BASE_URL
  const clientId = ''
  if (!baseUrl || !clientId) return 
    NextResponse.json({ 
      error: 'The api is not configured to authenticate with Spotify' 
    }, {
      status: 500
    })
  const authLink = 'https://accounts.spotify.com/authorize?response_type=code&client_id='
    + clientId 
    + '&scope=' 
    + scope 
    + '&redirect_uri' 
    + baseUrl
  
  return NextResponse.redirect(new URL(authLink))
}