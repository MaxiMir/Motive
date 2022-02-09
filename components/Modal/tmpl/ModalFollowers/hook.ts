import { useInfiniteQuery } from 'react-query'
import { UserDto } from 'dto'
import { PRELOAD_DIFF, partialFetcher, partialGetNextPageParam } from './helper'

type UseFollowers = {
  isLoading: boolean
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export default function useFollowers(id: number, count: number): UseFollowers {
  const fetcher = partialFetcher(id)
  const getNextPageParam = partialGetNextPageParam(count)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['followers', id, count], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const followers = data?.pages.flat() || []

  const checkOnLoadMore = (index: number) => !!hasNextPage && followers.length - index === PRELOAD_DIFF

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}
