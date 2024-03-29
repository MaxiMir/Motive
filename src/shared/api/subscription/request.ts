import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { UserDto } from '../user'

export function getSubscription(
  id: number,
  type: 'following' | 'followers',
  filter: Filter,
): Promise<UserDto[]> {
  const params = getFilterParams(filter)

  return fetcher.get(`/subscriptions/${id}/${type}`, { params })
}

export function updateSubscription(userId: number, insert: boolean): Promise<void> {
  const params = getFilterParams({ insert })

  return fetcher.patch('/subscriptions', { userId }, { params })
}
