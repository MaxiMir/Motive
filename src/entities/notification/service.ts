import fetcher from '@shared/api/fetcher'
import { getFilterParams, Filter } from '@lib/helpers/url'
import { NotificationDto } from '@entities/notification/dto'

export class NotificationService {
  static get(where: Filter['where']): Promise<NotificationDto[]> {
    const params = getFilterParams({ where })

    return fetcher.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return fetcher.patch(`/notifications/${id}/read`)
  }
}
