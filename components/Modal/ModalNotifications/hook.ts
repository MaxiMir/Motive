import { useState } from 'react'

export default function useNotificationHint(): [boolean, () => void] {
  const [show, setShow] = useState(Notification.permission === 'default')

  const onFulfilled = (permission: NotificationPermission) => {
    if (permission === 'default') return

    setShow(false)
  }

  const onClick = () => {
    Notification.requestPermission().then(onFulfilled)
  }

  return [show, onClick]
}
