import { useState } from 'react'

type UseNotificationHintResult = [show: boolean, onClose: () => void]

export const useNotificationHint = (): UseNotificationHintResult => {
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
