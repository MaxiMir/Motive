import { NotificationDto } from '@dto'
import fetcher from '@utils/fetcher'
import Service, { WhereParams } from './Service'

export default class NotificationService extends Service {
  static get(where: WhereParams): Promise<NotificationDto[]> {
    const params = NotificationService.getWhereParams(where)

    return fetcher.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return fetcher.patch(`/notifications/${id}/read`)
  }
}
