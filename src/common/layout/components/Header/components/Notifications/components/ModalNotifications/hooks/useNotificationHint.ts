import { useState } from 'react'

type UseNotificationHint = () => [show: boolean, onClose: () => void]

const useNotificationHint: UseNotificationHint = () => {
  const notificationSupport = 'Notification' in window
  const [show, setShow] = useState(notificationSupport && Notification.permission === 'default')

  const onFulfilled = (permission?: NotificationPermission) => {
    if (!permission || permission === 'default') return

    setShow(false)
  }

  const onClick = () => {
    if (!notificationSupport) {
      onFulfilled('granted')
      return
    }

    Notification.requestPermission().then(onFulfilled)
  }

  return [show, onClick]
}

export default useNotificationHint
