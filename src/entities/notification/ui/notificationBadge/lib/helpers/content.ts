import { NotificationDto } from '@entities/notification/model/dto'

export const getReadCount = (notifications: NotificationDto[]): number =>
  notifications.reduce((acc, notification) => acc + (!notification.read ? 1 : 0), 0)
