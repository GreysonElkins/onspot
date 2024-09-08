import { NextResponse } from 'next/server'

export const noAuthHttpError = NextResponse.json(
  { error: 'You must be logged in to perform this action' },
  { status: 401 }
)
export const spotifyConfigHttpError = NextResponse.json(
  { error: 'The API is not configured to authenticate with Spotify' },
  { status: 500 }
)

export const noLocalUserForSpotify = new Error('No user to store Spotify Token for')

export class NoLocalUserForSpotify extends Error {
  constructor() {
    super('No user to store Spotify Token for')
  }
}
