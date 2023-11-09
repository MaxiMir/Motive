import { useEffect, useRef, useState } from 'react'

export function useSlowClose(onClose: () => void) {
  const timerRef = useRef<number>()
  const [closing, setClosing] = useState(false)

  const onCloseCombine = () => {
    timerRef.current = window.setTimeout(onClose, 300)
    setClosing(true)
  }

  useEffect(() => {
    return () => {
      if (!timerRef.current) return

      clearTimeout(timerRef.current)
    }
  }, [])

  return [closing, onCloseCombine] as const
}
