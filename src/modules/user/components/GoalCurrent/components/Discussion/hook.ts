import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { TopicDto } from 'src/common/dto'
import { partialCheckOnLoadMore } from 'src/common/helpers/fetcher'
import { useMutateGoals } from '@modules/user'
import { PRELOAD_DIFF, getGoalNextState, partialFetcher, partialGetNextPageParam, getNextState } from './helper'

interface UseDiscussion {
  isLoading: boolean
  topics: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export const useDiscussion = (dayId: number, count: number): UseDiscussion => {
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

export const useAddMessage = (): ((topic: TopicDto) => void) => {
  const queryClient = useQueryClient()
  const [goals, mutateGoals] = useMutateGoals()

  return (topic: TopicDto) => {
    const { goalId, dayId } = topic

    mutateGoals(getGoalNextState(goalId, goals))
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', dayId],
      (prev) => prev && getNextState(prev, topic),
    )
  }
}
