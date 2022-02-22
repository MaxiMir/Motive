import { useInfiniteQuery } from 'react-query'
import { GoalDto } from 'dto'
import { partialCheckOnLoadMore, partialGetNextPageParam } from 'helpers/fetcher'
import { PRELOAD_DIFF, TAKE, partialFetcher } from './helper'

type UseFollowers = {
  isLoading: boolean
  goals?: GoalDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export default function useGoals(userId: number, count: number): UseFollowers {
  const fetcher = partialFetcher(userId)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['completed', userId, count], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const goals = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(goals.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, goals, checkOnLoadMore, fetchNextPage }
}
