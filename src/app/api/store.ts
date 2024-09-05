import { kv } from '@vercel/kv'

import {
  getSessionId,
  getSessionIdAndCreateIfMissing,
  SessionId
} from "./session"

const sessionName = (sessionId: SessionId, namespace = "") => (
  `session-${namespace}-${sessionId}`
)

class Store {
  static get = (key: string, namespace = ""): Promise<Record<string, unknown> | null> | null => {
    const sessionId = getSessionId()
    if (!sessionId) return null
    return kv.hget(sessionName(sessionId, namespace), key)
  }

  static getAll = (namespace = ""): Promise<Record<string, unknown> | null> | null => {
    const sessionId = getSessionId()
    if (!sessionId) return null
    return kv.hgetall(sessionName(sessionId, namespace))
  } 

  static set = (key: string, value: string, namespace = ""): Promise<number> | null => {
    const sessionId = getSessionIdAndCreateIfMissing()
    return kv.hset(sessionName(sessionId, namespace), { [key]: value })
  }
}

export default Store
