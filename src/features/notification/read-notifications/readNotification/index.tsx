import dynamic from 'next/dynamic'
import { NotificationCard } from 'entities/notification'
import { getNotificationHref } from 'entities/page'
import { useViewer } from 'entities/viewer'
import { NotificationDto } from 'shared/api'
import { useUpdateRead } from './model'

const InView = dynamic(() => import('shared/ui/InView'))

interface ReadNotificationProps {
  notification: NotificationDto
  onClose: () => void
}

function ReadNotification({ notification, onClose }: ReadNotificationProps) {
  const { id, read } = notification
  const viewer = useViewer()
  const notificationHref = getNotificationHref(notification, viewer?.nickname)
  const { mutate } = useUpdateRead()

  const onView = () => mutate(id)

  return (
    <>
      <NotificationCard notification={notification} href={notificationHref} onClose={onClose} />
      {!read && <InView onView={onView} />}
    </>
  )
}

export default ReadNotification
