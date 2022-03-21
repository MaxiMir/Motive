import { UserDto } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class FollowerService extends Service {
  static get(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = FollowerService.getPaginationParams(page, take)

    return Axios.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, add: boolean): Promise<void> {
    const params = FollowerService.getOperationParams(add)

    return Axios.patch('/subscriptions', { userId }, { params })
  }
}
