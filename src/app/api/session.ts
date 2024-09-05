
import "server-only"
import { cookies } from "next/headers"

export type SessionId = string

export const getSessionId = (): SessionId | undefined => (
  cookies().get("session-id")?.value
)

const setSessionId = (sessionId: SessionId): void => {
  cookies().set("session-id", sessionId)
}

export const getSessionIdAndCreateIfMissing = (): SessionId => {
  const sessionId = getSessionId()
  if (sessionId) return sessionId
  const newSessionId = crypto.randomUUID()
  setSessionId(newSessionId)

  return newSessionId
}
