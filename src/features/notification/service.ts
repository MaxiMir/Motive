import fetcher from '@lib/fetcher'
import { getFetchParams, FetchParams } from '@helpers/url'
import { NotificationDto } from '@features/notification/dto'

export class NotificationService {
  static get(where: FetchParams['where']): Promise<NotificationDto[]> {
    const params = getFetchParams({ where })

    return fetcher.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return fetcher.patch(`/notifications/${id}/read`)
  }
}
