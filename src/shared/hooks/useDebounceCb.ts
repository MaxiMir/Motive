import { useCallback, useRef } from 'react'

type Cb<T> = (t: T) => void

const useDebounceCb = <T>(cb: Cb<T>, delay?: number): Cb<T> => {
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
