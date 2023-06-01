import { useEffect, useState } from 'react'

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */
export const useDetectOnline = () => {
  const [online, setOnline] = useState(true)

  useEffect(() => {
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
