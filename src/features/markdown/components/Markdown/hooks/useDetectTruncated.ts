import { RefObject, useLayoutEffect, useState } from 'react'

export const useDetectTruncated = (containerRef: RefObject<HTMLDivElement>) => {
  const [truncated, setTruncated] = useState(false)

  useLayoutEffect(() => {
    const paragraph = containerRef.current?.querySelector('p:first-of-type')

    if (!paragraph) return

    const observer = new ResizeObserver((entries) => {
      setTruncated(entries.some((e) => e.target.scrollHeight > e.contentRect.height))
    })

    observer.observe(paragraph)
  }, [containerRef])

  return truncated
}
