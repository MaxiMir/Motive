import { useSyncExternalStore } from 'react'

export function useDetectOnline() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function getSnapshot() {
  return navigator.onLine
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)

  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function getServerSnapshot() {
  return true // Always show "Online" for server-generated HTML
}
