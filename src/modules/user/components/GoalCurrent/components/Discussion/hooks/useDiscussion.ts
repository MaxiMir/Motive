import { useInfiniteQuery } from 'react-query'
import { partialCheckOnLoadMore } from '@helpers/partial'
import { PRELOAD_DIFF, partialFetcher, partialGetNextPageParam } from '../helper'

const useDiscussion = (dayId: number, count: number) => {
  const fetcher = partialFetcher(dayId)
  const getNextPageParam = partialGetNextPageParam(count)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['discussion', dayId], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const topics = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(topics.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}

export default useDiscussion
