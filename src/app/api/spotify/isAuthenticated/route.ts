import { auth } from "@clerk/nextjs/server"

import { noAuthHttpError } from "../../errors"
import { NextResponse } from "next/server"
import Store from "../../store"


export const GET = async () => {
  const { userId } = auth()
  if (!userId) return noAuthHttpError
  const token = await Store.get('access_token', userId)
  return NextResponse.json(!!token)
}
