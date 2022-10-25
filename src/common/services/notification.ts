import Axios from 'src/common/lib/axios'
import { DayDto } from 'src/common/dto'
import { Service, WhereParams } from './Service'

export class NotificationService extends Service {
  static get(where: WhereParams): Promise<DayDto> {
    const params = NotificationService.getWhereParams(where)

    return Axios.get('/notifications', { params })
  }

  static updateRead(id: number): Promise<void> {
    return Axios.patch(`/notifications/${id}/read`)
  }
}
