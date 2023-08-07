import fscreen from 'fscreen'
import { useRef } from 'react'

export function useTryFullScreen() {
  const ref = useRef<HTMLDivElement | null>(null)
  const supported = fscreen.fullscreenEnabled

  const tryRequestFullscreen = () => {
    if (!supported || !ref.current) return

    fscreen.requestFullscreen(ref.current)
  }

  const enter = () => {
    setTimeout(tryRequestFullscreen, 100)
  }

  const exit = () => {
    if (!fscreen.fullscreenElement) return

    fscreen.exitFullscreen()
  }

  return { ref, supported, enter, exit }
}
