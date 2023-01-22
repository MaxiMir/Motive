import List from '@ui/List'
import { NotificationDto } from '@features/notification/dto'
import Notification from './components/Notification'

interface NotificationListProps {
  notifications: NotificationDto[]
  onClose: () => void
}

function NotificationList({ notifications, onClose }: NotificationListProps) {
  return (
    <List
      elements={notifications}
      spacing={2}
      keyGetter={(notification) => notification.id}
      render={(notification) => <Notification notification={notification} onClose={onClose} />}
    />
  )
}

export default NotificationList
