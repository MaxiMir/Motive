import { NotificationDto } from '@shared/api/notification'
import { fetcher } from '@shared/config'
import { Filter, getFilterParams } from '@shared/lib/helpers'

export const getNotifications = (where: Filter['where']): Promise<NotificationDto[]> => {
  const params = getFilterParams({ where })

  return fetcher.get('/notifications', { params })
}