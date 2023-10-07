import { useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device: Device) {
  const prevScrollTopRef = useRef(0)
  const [fixed, setFixedState] = useState(true)
  const desktop = !device?.type || device?.isDesktop
  const mobile = !device?.type || device?.isMobile

  useEffect(() => {
    const scrollListener = () => {
      const { scrollTop } = document.documentElement

      setFixedState(scrollTop <= 64 || prevScrollTopRef.current - scrollTop >= 0)
      prevScrollTopRef.current = scrollTop
    }

    if (!mobile) {
      return () => undefined
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, fixed }
}
