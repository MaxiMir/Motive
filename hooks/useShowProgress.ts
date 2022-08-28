import { useEffect, useState } from 'react'

export default function useShowProgress(value: number, step = 1, ms = 100): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress === value) {
        clearInterval(timer)
        return
      }

      setProgress((prev) => (prev + step >= value ? value : progress + step))
    }, ms)

    return () => {
      clearInterval(timer)
    }
  }, [ms, progress, step, value])

  return progress
}
