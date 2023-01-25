import List from '@shared/ui/List'
import { NotificationDto } from '@entities/notification/model/dto'
import Notification from './ui/notification/Notification'

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
