import { useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

const HEADER_SCROLL = 64

export function useLayout(device: Device) {
  const rafIdRef = useRef<number>()
  const prevScrollTopRef = useRef(0)
  const [fixed, setFixedState] = useState(true)
  const desktop = !device?.type || device?.isDesktop
  const mobile = !device?.type || device?.isMobile

  useEffect(() => {
    if (!mobile) {
      return () => undefined
    }

    const scrollListener = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const { scrollTop } = document.documentElement

        setFixedState(scrollTop <= HEADER_SCROLL || prevScrollTopRef.current - scrollTop >= 0)
        prevScrollTopRef.current = scrollTop
      })
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, fixed }
}
