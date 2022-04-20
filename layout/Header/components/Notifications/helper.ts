import { NotificationDto } from 'dto'

export const checkOnBadgeContent = (notifications: NotificationDto[]): number =>
  notifications.reduce((acc, notification) => acc + (!notification.read ? 1 : 0), 0)
