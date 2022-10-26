import { UserDto } from '@dto'
import { service } from '@utils/service'
import { Service } from './Service'

export class SubscriptionService extends Service {
  static getFollowing(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return service.get(`/subscriptions/${id}/following`, { params })
  }

  static getFollowers(id: number, page: number, take: number): Promise<UserDto[]> {
    const params = SubscriptionService.getPaginationParams(page, take)

    return service.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, add: boolean): Promise<void> {
    const params = SubscriptionService.getOperationParams(add)

    return service.patch('/subscriptions', { userId }, { params })
  }
}
