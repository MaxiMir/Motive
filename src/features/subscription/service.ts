import { UserDto } from '@features/user'
import fetcher from '@lib/fetcher'
import { FetchParams, getFetchParams } from '@helpers/url'

export class SubscriptionService {
  static getFollowing(id: number, fetchParams: FetchParams): Promise<UserDto[]> {
    const params = getFetchParams(fetchParams)

    return fetcher.get(`/subscriptions/${id}/following`, { params })
  }

  static getFollowers(id: number, fetchParams: FetchParams): Promise<UserDto[]> {
    const params = getFetchParams(fetchParams)

    return fetcher.get(`/subscriptions/${id}/followers`, { params })
  }

  static update(userId: number, insert: boolean): Promise<void> {
    const params = getFetchParams({ insert })

    return fetcher.patch('/subscriptions', { userId }, { params })
  }
}
