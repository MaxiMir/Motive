import { RefObject, useEffect, useState } from 'react'

export const useDetectTruncated = (containerRef: RefObject<HTMLDivElement>) => {
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    const firstElem = containerRef.current?.querySelector(':first-of-type')

    const observer = new ResizeObserver((entries) => {
      setTruncated(entries.some((e) => e.target.scrollHeight > e.contentRect.height))
    })

    if (firstElem) {
      observer.observe(firstElem)
    }

    return () => {
      if (!firstElem) return

      observer.unobserve(firstElem)
    }
  }, [containerRef])

  return truncated
}
