import { NextRequest, NextResponse } from "next/server"
import getSpotifyToken from "@/app/api/spotify/authenticate/getSpotifyToken"
import { noAuthHttpError, NoLocalUserForSpotify } from "@/app/api/errors"
import axios from "axios"

export const GET = async (request: NextRequest) => {
  try {
    const token = await getSpotifyToken()
    const limit = request.nextUrl.searchParams.get("limit") || 20
    const offset = request.nextUrl.searchParams.get("offset") || 0
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: { Authorization: `Bearer ${token}`},
        params: { limit, offset }
      })
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } catch (error) {
    if (error instanceof NoLocalUserForSpotify) {
      return noAuthHttpError
    }
    return NextResponse.json({ error }, { status: 500 })
  }
}
