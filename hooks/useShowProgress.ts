import { useEffect, useState } from 'react'

type Options = {
  step?: number
  ms?: number
  onEnd?: () => void
}

export default function useShowProgress(value: number, options: Options): number {
  const { step = 1, ms = 100, onEnd } = options
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress === value) {
        clearInterval(timer)
        onEnd?.()
        return
      }

      setProgress((prev) => (prev + step >= value ? value : progress + step))
    }, ms)

    return () => {
      clearInterval(timer)
    }
  }, [ms, progress, step, value, onEnd])

  return progress
}
