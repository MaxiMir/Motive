import { useInfiniteQuery } from 'react-query'
import { UserDetailDto, UserDto } from 'dto'
import { PRELOAD_DIFF, partialFetcher, partialGetNextPageParam } from './helper'

export default function useFollowers(user: UserDetailDto): {
  isLoading: boolean
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
} {
  const fetcher = partialFetcher(user.id)
  const getNextPageParam = partialGetNextPageParam(user.characteristic.followers)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['followers', user.id], fetcher, {
    getNextPageParam,
    enabled: !!user.characteristic.followers,
  })
  const followers = data?.pages.flat() || []

  const checkOnLoadMore = (index: number) => !!hasNextPage && followers.length - index === PRELOAD_DIFF

  return { isLoading, followers, checkOnLoadMore, fetchNextPage }
}
