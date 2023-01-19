import { RefObject, useEffect, useState } from 'react'

export const useDetectTruncated = (containerRef: RefObject<HTMLDivElement>) => {
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    const paragraph = containerRef.current?.querySelector('p:first-of-type')
    const observer = new ResizeObserver((entries) => {
      setTruncated(entries.some((e) => e.target.scrollHeight > e.contentRect.height))
    })

    if (paragraph) {
      observer.observe(paragraph)
    }

    return () => {
      if (!paragraph) return

      observer.unobserve(paragraph)
    }
  }, [containerRef])

  return truncated
}
