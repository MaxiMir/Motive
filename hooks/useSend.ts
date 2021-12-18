import { useCallback, useState } from 'react'
import { AxiosRequestConfig } from 'axios'
import useSnackbar from './useSnackbar'

interface Options<R> {
  onSuccess?: (response: R, data: AxiosRequestConfig['data']) => void
  onError?: (e: unknown, request: AxiosRequestConfig['data']) => void
}

interface UseSend<D> {
  isLoading: boolean
  send: (data: D) => void
}

export default function useSend<D, R>(
  fetcher: (data: D) => Promise<R>,
  { onSuccess, onError }: Options<R>,
): UseSend<D> {
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const send = useCallback(
    async (data) => {
      try {
        setIsLoading(true)
        const response = await fetcher(data)
        onSuccess?.(response, data)
      } catch (e) {
        onError?.(e, data)
        enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
      } finally {
        setIsLoading(false)
      }
    },
    [enqueueSnackbar, fetcher, onError, onSuccess],
  )

  return { isLoading, send }
}
