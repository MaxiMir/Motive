import { NotificationDto } from 'dto'
import AppList from 'components/UI/AppList'
import Notification from './components/Notification'

interface NotificationListProps {
  notifications: NotificationDto[]
  onClose: () => void
}

export default function NotificationList({ notifications, onClose }: NotificationListProps): JSX.Element {
  return (
    <AppList
      elements={notifications}
      gap={2}
      keyGetter={(notification) => notification.id}
      render={(notification) => <Notification notification={notification} onClose={onClose} />}
    />
  )
}
