import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device?: Device) {
  const prevScrollYRef = useRef(0)
  const [scrollUpState, setScrollUpState] = useState(true)
  const possibleDesktop = device === 'desktop'
  const desktop = !device || possibleDesktop
  const mobile = !device || !possibleDesktop
  const scrollUp = useDeferredValue(scrollUpState)

  useEffect(() => {
    const scrollListener = () => {
      setScrollUpState(prevScrollYRef.current - window.scrollY > 0)
      prevScrollYRef.current = window.scrollY
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, scrollUp }
}
