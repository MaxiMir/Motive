import { UserDto } from '@modules/user'
import fetcher from '@lib/fetcher'
import { Filter, getFilterParams } from '@helpers/url'

export class SubscriptionService {
  static getFollowing(id: number, filter: Filter): Promise<UserDto[]> {
    const params = getFilterParams(filter)

    return fetcher.get(`/subscriptions/${id}/following`, { params })
  }

  static getFollowers(id: number, filter: Filter): Promise<UserDto[]> {
    const params = getFilterParams(filter)

    return fetcher.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, insert: boolean): Promise<void> {
    const params = getFilterParams({ insert })

    return fetcher.patch('/subscriptions', { userId }, { params })
  }
}
