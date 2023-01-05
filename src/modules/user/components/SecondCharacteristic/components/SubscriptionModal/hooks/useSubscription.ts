import { useMemo } from 'react'
import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import { SecondCharacteristicName } from '@features/characteristic'
import { SubscriptionService } from '@features/subscription'
import { partialCheckOnLoadMore, partialGetNextPageParam } from '@helpers/partial'

const TAKE = 20
const PRELOAD_DIFF = 5

const partialQueryFn = (userId: number, name: SecondCharacteristicName) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => {
    const method = name === SecondCharacteristicName.Following ? 'getFollowing' : 'getFollowers'

    return SubscriptionService[method](userId, { page: pageParam, take: TAKE })
  }
}

export const useSubscription = (userId: number, count: number, name: SecondCharacteristicName) => {
  const queryFn = partialQueryFn(userId, name)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [name, userId, count],
    queryFn,
    {
      getNextPageParam,
      enabled: !!count,
    },
  )
  const followers = useMemo(() => data?.pages.flat() || [], [data?.pages])
  const checkOnLoadMore = partialCheckOnLoadMore(followers.length, PRELOAD_DIFF, hasNextPage)

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}
