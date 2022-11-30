import { QueryFunctionContext } from 'react-query'
import { SecondCharacteristicName, UserDto } from '@dto'
import SubscriptionService from '@services/subscription'

export const TAKE = 20
export const PRELOAD_DIFF = 5

export const partialFetcher = (
  userId: number,
  name: SecondCharacteristicName,
): ((c: QueryFunctionContext) => Promise<UserDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => {
    const method = name === SecondCharacteristicName.Following ? 'getFollowing' : 'getFollowers'

    return SubscriptionService[method](userId, pageParam, TAKE)
  }
}
