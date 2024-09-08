import { useState } from "react"

import useApi, { Params as ApiParams } from "./useApi"

interface Params extends ApiParams {
  limit?: number
  total?: number
}

const usePaginatedApi = <T>({ limit = 50, total, url, ...params }: Params) => {
  const [offset, setOffset] = useState<number>(0)

  const response = useApi<T>({ ...params, url: url + `?offset=${offset}&limit=${limit}` })

  const next = () => {
    if (total) {
      const diff = offset + limit - total
      if (diff < limit && diff < 0) 
        setOffset(prev => prev+limit)
    } else {
      setOffset(prev => prev+limit)
      }
  }

  const prev = () => {
    if (offset > 0) {
      setOffset(prev => prev-limit)
    }
  }

  return { ...response, prev, next }
}

export default usePaginatedApi
