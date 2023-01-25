import fetcher from '@shared/config/fetcher'
import { SecondCharacteristicName } from '@shared/api/characteristic'
import { UserDto } from '@shared/api/user'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'

type Subscription = SecondCharacteristicName.Following | SecondCharacteristicName.Followers

export const getSubscription = (
  id: number,
  filter: Filter,
  type: Subscription,
): Promise<UserDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get(`/subscriptions/${id}/${type}`, { params })
}
