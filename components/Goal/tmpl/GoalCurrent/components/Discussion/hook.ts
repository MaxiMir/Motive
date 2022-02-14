import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { TopicDto } from 'dto'
import { useMutateGoals } from 'views/UserView/hook'
import { PRELOAD_DIFF, getGoalNextState, partialFetcher, partialGetNextPageParam, addTopic } from './helper'

type UseDiscussion = {
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

  const checkOnLoadMore = (index: number) => !!hasNextPage && topics.length - index === PRELOAD_DIFF

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}

export const useAddTopic = (goalId: number, dayId: number): ((topic: TopicDto) => void) => {
  const queryClient = useQueryClient()
  const [goals, mutateGoals] = useMutateGoals()

  return (topic: TopicDto) => {
    mutateGoals(getGoalNextState(goalId, goals))
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', dayId],
      (prev) => prev && addTopic(prev, topic),
    )
  }
}
