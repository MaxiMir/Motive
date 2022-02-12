import { useRef } from 'react'

export default function useDebounceCb<T>(cb: (t: T) => void, delay = 500): (t: T) => void {
  const timerRef = useRef<NodeJS.Timeout>()

  return (arg: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => cb(arg), delay)
  }
}
