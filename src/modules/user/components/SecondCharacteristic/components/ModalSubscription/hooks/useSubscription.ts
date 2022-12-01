import { useInfiniteQuery } from 'react-query'
import { SecondCharacteristicName } from '@dto'
import { partialCheckOnLoadMore, partialGetNextPageParam } from '@helpers/partial'
import { PRELOAD_DIFF, TAKE, partialFetcher } from '../helper'

const useSubscription = (userId: number, count: number, name: SecondCharacteristicName) => {
  const fetcher = partialFetcher(userId, name)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery([name, userId, count], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const followers = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(followers.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}

export default useSubscription
