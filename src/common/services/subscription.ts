import { UserDto } from 'src/common/dto'
import Axios from 'src/common/lib/axios'
import { Service } from './Service'

export class SubscriptionService extends Service {
  static getFollowing(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return Axios.get(`/subscriptions/${id}/following`, { params })
  }

  static getFollowers(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return Axios.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, add: boolean): Promise<void> {
    const params = SubscriptionService.getOperationParams(add)

    return Axios.patch('/subscriptions', { userId }, { params })
  }
}
