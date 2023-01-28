import { NotificationDto } from 'shared/api'
import List from 'shared/ui/List'
import { Notification } from './notification'

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
