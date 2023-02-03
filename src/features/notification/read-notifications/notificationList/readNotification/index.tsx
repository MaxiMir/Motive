import dynamic from 'next/dynamic'
import { NotificationInfo } from 'entities/notification'
import { getNotificationHref } from 'entities/page'
import { useClient } from 'entities/user'
import { NotificationDto } from 'shared/api'
import { useUpdateRead } from './model'

const InView = dynamic(() => import('shared/ui/InView'))

interface ReadNotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export function ReadNotification({ notification, onClose }: ReadNotificationProps) {
  const { id, read } = notification
  const client = useClient()
  const notificationHref = getNotificationHref(notification, client)
  const { mutate } = useUpdateRead()

  const onView = () => mutate(id)

  return (
    <>
      <NotificationInfo notification={notification} href={notificationHref} onClick={onClose} />
      {!read && <InView onView={onView} />}
    </>
  )
}
