import { useCallback, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'lib/axios'

interface Config {
  url: AxiosRequestConfig['url']
  method: AxiosRequestConfig['method']
  data: AxiosRequestConfig['data']
}

interface Options {
  onSuccess: (response: AxiosResponse, data: AxiosRequestConfig['data']) => void
  onError: (e: Error, request: AxiosRequestConfig['data']) => void
}

export default function useSend({ onSuccess, onError }: Options): {
  isLoading: boolean
  send: (config: Config) => void
} {
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(
    async (config: Config) => {
      try {
        setIsLoading(true)
        const response = await Axios(config)
        onSuccess(response, config.data)
      } catch (e) {
        onError(e, config.data)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess],
  )

  return { isLoading, send }
}
