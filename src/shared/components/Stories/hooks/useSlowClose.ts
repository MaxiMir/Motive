import { useEffect, useRef, useState } from 'react'

type UseSlowCloseResult = [closing: boolean, onCloseSlow: () => void]

export const useSlowClose = (onClose: () => void): UseSlowCloseResult => {
  const timerRef = useRef<NodeJS.Timeout>()
  const [closing, setClosing] = useState(false)

  const onCloseCombine = () => {
    timerRef.current = setTimeout(onClose, 300)
    setClosing(true)
  }

  useEffect(() => {
    return () => {
      if (!timerRef.current) return

      clearTimeout(timerRef.current)
    }
  }, [])

  return [closing, onCloseCombine]
}
