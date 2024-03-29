import { useCallback, useRef } from 'react'

type Cb<T> = (t: T) => void

export function useDebounceCb<T>(cb: Cb<T>, delay = 1000): Cb<T> {
  const timerRef = useRef<number>()

  return useCallback(
    (arg) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => cb(arg), delay)
    },
    [cb, delay],
  )
}
