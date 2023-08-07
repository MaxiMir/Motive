import { NotificationDto } from 'shared/api'

export function getReadCount(notifications: NotificationDto[]) {
  return notifications.reduce((acc, notification) => acc + (!notification.read ? 1 : 0), 0)
}
