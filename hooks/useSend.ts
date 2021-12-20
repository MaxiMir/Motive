import { useCallback, useState } from 'react'
import useSnackbar from './useSnackbar'

interface Options<R, D> {
  onSuccess?: (response: R, data: D) => void
  onError?: (e: unknown, request: D) => void
}

interface UseSend<D> {
  isLoading: boolean
  send: (data: D) => void
}

export default function useSend<D, R>(
  fetcher: (data: D) => Promise<R>,
  { onSuccess, onError }: Options<R, D>,
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
