import { NotificationDto } from '@dto'
import AppList from '@ui/AppList'
import NotificationModal from './components/Notification'

interface NotificationListProps {
  notifications: NotificationDto[]
  onClose: () => void
}

export default function NotificationList({ notifications, onClose }: NotificationListProps) {
  return (
    <AppList
      elements={notifications}
      gap={2}
      keyGetter={(notification) => notification.id}
      render={(notification) => <NotificationModal notification={notification} onClose={onClose} />}
    />
  )
}
