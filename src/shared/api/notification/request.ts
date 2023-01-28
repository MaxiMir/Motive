import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { NotificationDto } from './model'

export const getNotifications = (where: Filter['where']): Promise<NotificationDto[]> => {
  const params = getFilterParams({ where })

  return fetcher.get('/notifications', { params })
}

export const updateRead = (id: number): Promise<void> => {
  return fetcher.patch(`/notifications/${id}/read`)
}
