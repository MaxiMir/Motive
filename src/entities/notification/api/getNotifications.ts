import { NotificationDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers'

export const getNotifications = (where: Filter['where']): Promise<NotificationDto[]> => {
  const params = getFilterParams({ where })

  return fetcher.get('/notifications', { params })
}
