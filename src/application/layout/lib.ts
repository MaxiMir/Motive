import { useEffect, useRef, useState } from 'react'

const HEADER_SCROLL = 64

export function useLayout(isDesktop: boolean) {
  const rafIdRef = useRef<number>()
  const prevScrollTopRef = useRef(0)
  const [fixed, setFixedState] = useState(true)

  useEffect(() => {
    if (isDesktop) {
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
  }, [isDesktop])

  return { fixed }
}
