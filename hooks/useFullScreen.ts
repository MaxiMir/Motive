import { useCallback, useRef } from 'react'
import fscreen from 'fscreen'

export default function useFullScreen() {
  const ref = useRef<HTMLDivElement | null>(null)

  const enter = useCallback(() => {
    if (!ref.current) return

    try {
      fscreen.requestFullscreen(ref.current)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const exit = useCallback(() => {
    if (!fscreen.fullscreenElement) return

    fscreen.exitFullscreen()
  }, [])

  return { ref, enter, exit }
}
