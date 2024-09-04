"use client"

import { useState, useCallback, useEffect } from "react"
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios"

interface Params extends AxiosRequestConfig {
  onRender?: boolean
}

const useKpi = <T>({ onRender = true, ...params }: Params) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)
  
  const reset = () => {
    if (loading) return // cancel? throw an error?
    setLoading(true)
    data && setData(null)
    error && setError(null)
    setLoading(false)
  // eslint-disable-next-line
  }

  const handleError = (e: unknown) => {
    if (e instanceof Error ) throw e
    throw Error(`An unknown error occurred: ${e}`)
  } 

  const call = useCallback(async (onCallParams = {} as AxiosRequestConfig) => {
    if (loading) return // throw an error?
    setLoading(true)
    try {
      const res = await axios<T>({ ...onCallParams, ...params})
      const resData = await res.data
      setData(resData)
    } catch (error) {
      if (isAxiosError(error)) setError(error)
      else { handleError(error) }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line
}, [params.url, params.baseURL, params.headers, params.data])  

useEffect(() => {
  onRender && call()
  // eslint-disable-next-line
  }, [onRender, call])

  return { data, loading, error, call, reset }
}

export default useKpi
