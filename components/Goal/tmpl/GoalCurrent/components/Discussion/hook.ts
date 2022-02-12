import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { TopicDto } from 'dto'
import { useMutateGoals } from 'views/UserView/hook'
import { PRELOAD_DIFF, changeGoals, partialFetcher, partialGetNextPageParam, addTopic } from './helper'

type UseDiscussion = {
  isLoading: boolean
  topics: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  fetchNextPage: () => void
}

export const useDiscussion = (dayID: number, count: number): UseDiscussion => {
  const fetcher = partialFetcher(dayID)
  const getNextPageParam = partialGetNextPageParam(count)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(['discussion', dayID], fetcher, {
    getNextPageParam,
    enabled: !!count,
  })
  const topics = data?.pages.flat() || []

  const checkOnLoadMore = (index: number) => !!hasNextPage && topics.length - index === PRELOAD_DIFF

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}

export const useAddTopic = (goalID: number, dayID: number): ((topic: TopicDto) => void) => {
  const queryClient = useQueryClient()
  const [goals, mutateGoals] = useMutateGoals()

  return (topic: TopicDto) => {
    mutateGoals(changeGoals(goalID, goals))
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', dayID],
      (prev) => prev && addTopic(prev, topic),
    )
  }
}
