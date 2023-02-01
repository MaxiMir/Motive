import { NotificationDto } from 'shared/api'

export const getReadCount = (notifications: NotificationDto[]) =>
  notifications.reduce((acc, notification) => acc + (!notification.read ? 1 : 0), 0)
