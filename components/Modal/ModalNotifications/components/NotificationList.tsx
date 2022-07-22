import { NotificationDto } from 'dto'
import NotificationModal from 'components/Notification/NotificationModal'
import AppList from 'components/ui/AppList'

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
