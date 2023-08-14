import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device?: Device) {
  const prevScrollTopRef = useRef(0)
  const [scrolled, setScrolled] = useState(0)
  const possibleDesktop = device === 'desktop'
  const desktop = !device || possibleDesktop
  const mobile = !device || !possibleDesktop
  const scrolledUp = useDeferredValue(scrolled >= 0)

  useEffect(() => {
    const scrollListener = () => {
      const { scrollTop } = document.documentElement

      setScrolled(prevScrollTopRef.current - scrollTop)
      prevScrollTopRef.current = scrollTop
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, scrolledUp }
}
