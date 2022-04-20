import { NotificationDto } from 'dto'
import Notification from 'components/Notification'
import AppList from 'components/UI/AppList'

interface NotificationListProps {
  notifications: NotificationDto[]
}

export default function NotificationList({ notifications }: NotificationListProps): JSX.Element {
  return (
    <AppList
      elements={notifications}
      gap={1}
      keyGetter={(notification) => notification.id}
      render={(notification) => <Notification {...notification} />}
    />
  )
}
