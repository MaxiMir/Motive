import { useInfiniteQuery } from 'react-query'
import { ConfirmationDto } from 'dto'
import { partialCheckOnLoadMore, partialGetNextPageParam } from 'helpers/fetcher'
import { PRELOAD_DIFF, TAKE, partialFetcher } from './helper'

interface UseGoals {
  isLoading: boolean
  confirmations?: ConfirmationDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export default function useConfirmations(userId: number, count: number): UseGoals {
  const fetcher = partialFetcher(userId)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['completed', userId, count], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const confirmations = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(confirmations.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, confirmations, checkOnLoadMore, fetchNextPage }
}
