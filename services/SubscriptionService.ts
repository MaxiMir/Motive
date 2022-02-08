import { UserDto } from 'dto'
import Axios from 'lib/axios'
import { Service } from './Service'

export default class SubscriptionService extends Service {
  static getFollowers(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = Service.getPaginationParams(page, take)

    return Axios.get(`/subscriptions/${id}/followers`, { params })
  }

  /**
   * /subscriptions?operation=insert|delete
   */
  static updateFollowing(data: { id: number; add: boolean }): Promise<void> {
    const { id, add } = data
    const params = SubscriptionService.getOperationParams(add)

    return Axios.put(`/subscriptions`, { id }, { params })
  }
}
