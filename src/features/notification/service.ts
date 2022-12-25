import fetcher from '@lib/fetcher'
import { getFilterParams, Filter } from '@helpers/url'
import { NotificationDto } from '@features/notification/dto'

export class NotificationService {
  static get(where: Filter['where']): Promise<NotificationDto[]> {
    const params = getFilterParams({ where })

    return fetcher.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return fetcher.patch(`/notifications/${id}/read`)
  }
}
