import { useEffect, useState } from 'react'

export const useOnline = () => {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)

    window.addEventListener('online', () => {
      setOnline(true)
    })

    window.addEventListener('offline', () => {
      setOnline(false)
    })
  }, [])

  return online
}
