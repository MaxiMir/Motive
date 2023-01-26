import { NotificationDto } from '@shared/api/dto'

export const getReadCount = (notifications: NotificationDto[]): number =>
  notifications.reduce((acc, notification) => acc + (!notification.read ? 1 : 0), 0)
