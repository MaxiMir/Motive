import { useCallback, useState } from 'react'
import { AxiosRequestConfig } from 'axios'

interface Options<R> {
  onSuccess: (response: R, data: AxiosRequestConfig['data']) => void
  onError: (e: Error, request: AxiosRequestConfig['data']) => void
}

export default function useSend<D, R>(
  fetcher: (data: D) => Promise<R>,
  { onSuccess, onError }: Options<R>,
): {
  isLoading: boolean
  send: (data: D) => void
} {
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(
    async (data) => {
      try {
        setIsLoading(true)
        const response = await fetcher(data)
        onSuccess(response, data)
      } catch (e) {
        onError(e, data)
      } finally {
        setIsLoading(false)
      }
    },
    [fetcher, onError, onSuccess],
  )

  return { isLoading, send }
}