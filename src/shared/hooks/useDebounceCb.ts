import { useCallback, useRef } from 'react'

type UseDebounceCb = <T>(cb: (t: T) => void, delay?: number) => (t: T) => void

const useDebounceCb: UseDebounceCb = (cb, delay = 500) => {
  const timerRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (arg) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => cb(arg), delay)
    },
    [cb, delay],
  )
}

export default useDebounceCb
