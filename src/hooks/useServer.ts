import useApi, { Params } from "./useApi"

const useServer = <T>({ url, ...params }: Params) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  if (!BASE_URL) throw new Error('App needs to be configured with `NEXT_PUBLIC_BASE_URL`')
  const serverUrl = BASE_URL + url
  return useApi<T>({ url: serverUrl, ...params })
}

export default useServer
