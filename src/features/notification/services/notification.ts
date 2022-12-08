import fetcher from '@lib/fetcher'
import { NotificationDto } from '@features/notification/dto'
import { getServerParams, Params } from '@helpers/url'

export class NotificationService {
  static get(where: Params['where']): Promise<NotificationDto[]> {
    const params = getServerParams({ where })

    return fetcher.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return fetcher.patch(`/notifications/${id}/read`)
  }
}
