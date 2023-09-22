import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device: Device) {
  const prevScrollTopRef = useRef(0)
  const [fixedState, setFixedState] = useState(true)
  const desktop = !device?.type || device?.isDesktop
  const mobile = !device?.type || device?.isMobile
  const fixed = useDeferredValue(fixedState)

  useEffect(() => {
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const scrollListener = () => {
      const { scrollTop } = document.documentElement
      const headerShow = scrollTop <= 64
      const footerStatic = maxHeight - scrollTop > 30
      setFixedState(headerShow || (footerStatic && prevScrollTopRef.current - scrollTop >= 0))
      prevScrollTopRef.current = scrollTop
    }

    if (!mobile) {
      return () => undefined
    }

    document.addEventListener('scroll', scrollListener)

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, fixed }
}
