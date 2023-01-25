import fetcher from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'
import { UserDto } from '@entities/user'
import { SecondCharacteristicName } from '@app//model/characteristic'

type Subscription = SecondCharacteristicName.Following | SecondCharacteristicName.Followers

export const getSubscription = (
  id: number,
  filter: Filter,
  type: Subscription,
): Promise<UserDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get(`/subscriptions/${id}/${type}`, { params })
}
