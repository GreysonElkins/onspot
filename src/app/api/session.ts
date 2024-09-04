import nextAppSession, { promisifyStore } from "next-app-session";
import Redis from 'ioredis'
import RedisStoreFactory from "connect-redis"
import RedisStore from "connect-redis";

type SessionData = {
  spotify_auth_state?: string
  spotify_access_token?: string
  spotify_token_type?: string
  spotify_scope?: string
  spotify_expires_in?: number
  spotify_refresh_token?: string
}


export default nextAppSession<SessionData>({
  name: 'SID',
  secret: process.env.REDIS_SECRET || '',
  store: promisifyStore(
    new RedisStore({
      client: new Redis({
        host: process.env.REDIS_HOST || '',
        port: Number(process.env.REDIS_PORT || 0)
      })
    })
  )
})
