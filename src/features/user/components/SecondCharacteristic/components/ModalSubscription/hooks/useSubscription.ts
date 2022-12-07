import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import { SecondCharacteristicName, UserDto } from '@dto'
import SubscriptionService from '@services/subscription'
import { partialCheckOnLoadMore, partialGetNextPageParam } from '@helpers/partial'

const TAKE = 20
const PRELOAD_DIFF = 5

const partialQueryFn = (
  userId: number,
  name: SecondCharacteristicName,
): ((c: QueryFunctionContext) => Promise<UserDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => {
    const method = name === SecondCharacteristicName.Following ? 'getFollowing' : 'getFollowers'

    return SubscriptionService[method](userId, pageParam, TAKE)
  }
}

export const useSubscription = (userId: number, count: number, name: SecondCharacteristicName) => {
  const queryFn = partialQueryFn(userId, name)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery([name, userId, count], queryFn, {
    getNextPageParam,
    enabled: !!count,
  })
  const followers = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(followers.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}
