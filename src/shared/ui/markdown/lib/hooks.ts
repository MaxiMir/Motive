import { useEffect, useRef, useState } from 'react'

export function useDetectTruncated() {
  const ref = useRef<HTMLDivElement>(null)
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    const firstElem = ref.current?.querySelector(':first-of-type')

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
  }, [])

  return [ref, truncated] as const
}
