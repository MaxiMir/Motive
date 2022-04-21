import { useInfiniteQuery } from 'react-query'
import { UserDto } from 'dto'
import { partialCheckOnLoadMore, partialGetNextPageParam } from 'helpers/fetcher'
import { PRELOAD_DIFF, TAKE, partialFetcher } from './helper'

type UseFollowers = {
  isLoading: boolean
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export default function useFollowers(userId: number, count: number): UseFollowers {
  const fetcher = partialFetcher(userId)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['followers', userId, count], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const followers = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(followers.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}
