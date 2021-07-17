import { useRef } from 'react'

export default function useDebounceCb<T>(cb: (t: T) => void, delay = 1000): ((t: T) => void) {
  const timerIdRef = useRef<NodeJS.Timeout>()

  return (arg: T) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
    }

    timerIdRef.current = setTimeout(() => cb(arg), delay)
  }
}
