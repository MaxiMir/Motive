import { useEffect, useRef, useState } from 'react'

const HEADER_SCROLL = 64

export function useLayout(isDesktop: boolean) {
  const rafIdRef = useRef(0)
  const prevScrollTopRef = useRef(0)
  const [fixed, setFixedState] = useState(true)

  useEffect(() => {
    if (isDesktop) {
      return () => undefined
    }

    const scrollListener = () => {
      cancelAnimationFrame(rafIdRef.current)

      rafIdRef.current = requestAnimationFrame(() => {
        const { scrollTop } = document.documentElement

        setFixedState(scrollTop <= HEADER_SCROLL || prevScrollTopRef.current - scrollTop >= 0)
        prevScrollTopRef.current = scrollTop
      })
    }

    document.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      cancelAnimationFrame(rafIdRef.current)
      document.removeEventListener('scroll', scrollListener)
    }
  }, [isDesktop])

  return { fixed }
}
