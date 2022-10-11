import { useInfiniteQuery } from 'react-query'
import { SecondCharacteristicName, UserDto } from 'dto'
import { partialCheckOnLoadMore, partialGetNextPageParam } from 'helpers/fetcher'
import { PRELOAD_DIFF, TAKE, partialFetcher } from './helper'

type UseSubscription = {
  isLoading: boolean
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export default function useSubscription(
  userId: number,
  count: number,
  name: SecondCharacteristicName,
): UseSubscription {
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
