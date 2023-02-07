import { useEffect, useState } from 'react'

export const useDetectOnline = () => {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)

    const onlineListener = () => setOnline(true)

    const offlineListener = () => setOnline(false)

    window.addEventListener('online', onlineListener)
    window.addEventListener('offline', offlineListener)

    return () => {
      window.removeEventListener('online', onlineListener)
      window.removeEventListener('offline', offlineListener)
    }
  }, [])

  return online
}
