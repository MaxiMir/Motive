import { service } from '@utils/service'
import { DayDto } from '@dto'
import { Service, WhereParams } from './Service'

export class NotificationService extends Service {
  static get(where: WhereParams): Promise<DayDto> {
    const params = NotificationService.getWhereParams(where)

    return service.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return service.patch(`/notifications/${id}/read`)
  }
}
