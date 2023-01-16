import AppList from '@ui/AppList'
import { NotificationDto } from '@features/notification/dto'
import Notification from './components/Notification'

interface NotificationListProps {
  notifications: NotificationDto[]
  onClose: () => void
}

function NotificationList({ notifications, onClose }: NotificationListProps) {
  return (
    <AppList
      elements={notifications}
      gap={2}
      keyGetter={(notification) => notification.id}
      render={(notification) => <Notification notification={notification} onClose={onClose} />}
    />
  )
}

export default NotificationList
