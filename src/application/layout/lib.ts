import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device?: Device) {
  const scrollYRef = useRef(0)
  const [scrolledState, setScrolledState] = useState(0)
  const possibleDesktop = device === 'desktop'
  const desktop = !device || possibleDesktop
  const mobile = !device || !possibleDesktop
  const scrolledDown = useDeferredValue(scrolledState <= 0)

  useEffect(() => {
    const scrollListener = () => {
      setScrolledState(!window.scrollY ? 0 : scrollYRef.current - window.scrollY)
      scrollYRef.current = window.scrollY
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, scrolledDown }
}
