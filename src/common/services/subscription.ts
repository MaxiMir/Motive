import { UserDto } from '@dto'
import fetcher from '@utils/fetcher'
import Service from './Service'

export default class SubscriptionService extends Service {
  static getFollowing(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return fetcher.get(`/subscriptions/${id}/following`, { params })
  }

  static getFollowers(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return fetcher.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, add: boolean): Promise<void> {
    const params = SubscriptionService.getOperationParams(add)

    return fetcher.patch('/subscriptions', { userId }, { params })
  }
}
