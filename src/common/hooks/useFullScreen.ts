import { useRef, useState } from 'react'
import fscreen from 'fscreen'

const useFullScreen = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const enabled = fscreen.fullscreenEnabled

  const enter = () => {
    if (!ref.current) return

    try {
      fscreen.requestFullscreen(ref.current)
    } catch {
      // fullscreen not supported
    }
  }

  const onOpen = () => {
    setOpen(true)
    setTimeout(enter, 0)
  }

  const onClose = () => {
    setOpen(false)

    if (!fscreen.fullscreenElement) return

    fscreen.exitFullscreen()
  }

  return { ref, enabled, open, onOpen, onClose }
}

export default useFullScreen
