import { UserDto } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class SubscriptionService extends Service {
  static getFollowers(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return Axios.get(`/subscriptions/${id}/followers`, { params })
  }

  /**
   * /subscriptions?operation=insert|delete
   */
  static updateFollowing(id: number, add: boolean): Promise<void> {
    const params = SubscriptionService.getOperationParams(add)

    return Axios.put('/subscriptions', { id }, { params })
  }
}
