import Axios from 'lib/axios'
import { DayDto } from 'dto'
import { Service, WhereParams } from './Service'

export default class NotificationService extends Service {
  static get(where: WhereParams): Promise<DayDto> {
    const params = NotificationService.getWhereParams(where)

    return Axios.get('/notifications', { params })
  }
}
