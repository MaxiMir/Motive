import { useEffect, useState } from 'react'

interface Options {
  step?: number
  ms?: number
  onEnd?: () => void
}

const useShowProgress = (value: number, options: Options = {}) => {
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

export default useShowProgress
