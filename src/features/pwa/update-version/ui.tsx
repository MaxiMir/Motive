import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const NewVersionModal = dynamic(() => import('./new-version-modal'))

export function UpdateVersion() {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  const onConfirm = () => {
    window.workbox.messageSkipWaiting()
    onClose()
  }

  useEffect(() => {
    if (!window.workbox) return

    window.workbox.addEventListener('controlling', window.location.reload)
    window.workbox.addEventListener('waiting', () => setIsOpen(true))
    window.workbox.register()
  }, [])

  return <>{isOpen && <NewVersionModal onConfirm={onConfirm} onClose={onClose} />}</>
}

export default UpdateVersion
