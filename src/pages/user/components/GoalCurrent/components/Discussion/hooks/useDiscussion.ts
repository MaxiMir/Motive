import { useMemo } from 'react'
import { GetNextPageParamFunction, useInfiniteQuery } from 'react-query'
import { partialCheckOnLoadMore } from '@shared/lib/helpers/partial'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { TopicDto, getTopics } from '@entities/topic'

const TAKE = 20
const PRELOAD_DIFF = 5

const partialGetNextPageParam = (count: number): GetNextPageParamFunction<TopicDto[]> => {
  return (_, allPages) => {
    const allCount = allPages.flat().reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)

    return allCount < count ? allCount / TAKE : undefined
  }
}

export const useDiscussion = () => {
  const { day } = useGoalContext()
  const getNextPageParam = partialGetNextPageParam(day.topicCount)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['discussion', day.id],
    ({ pageParam = 0 }) => getTopics({ where: { day: day.id }, page: pageParam, take: TAKE }),
    {
      getNextPageParam,
      enabled: !!day.topicCount,
    },
  )
  const topics = useMemo(() => data?.pages.flat() || [], [data?.pages])
  const checkOnLoadMore = partialCheckOnLoadMore(topics.length, PRELOAD_DIFF, hasNextPage)

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}
