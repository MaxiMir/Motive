import { useEffect, useRef, useState } from 'react'
import { Device } from 'shared/api'

export function useLayout(device?: Device) {
  const prevScrollTopRef = useRef(0)
  const [fixed, setFixed] = useState(true)
  const possibleDesktop = device === 'desktop'
  const desktop = !device || possibleDesktop
  const mobile = !device || !possibleDesktop

  useEffect(() => {
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const scrollListener = () => {
      const { scrollTop } = document.documentElement
      const headerShow = scrollTop <= 64
      const footerStatic = maxHeight - scrollTop > 24
      setFixed(headerShow || (footerStatic && prevScrollTopRef.current - scrollTop >= 0))
      prevScrollTopRef.current = scrollTop
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [mobile])

  return { desktop, mobile, fixed }
}
