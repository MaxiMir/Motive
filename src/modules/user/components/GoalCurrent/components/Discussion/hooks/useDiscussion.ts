import { GetNextPageParamFunction, useInfiniteQuery } from 'react-query'
import { TopicDto } from '@dto'
import { partialCheckOnLoadMore } from '@helpers/partial'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import TopicService from '@services/topic'

const TAKE = 20
const PRELOAD_DIFF = 5

const partialGetNextPageParam = (count: number): GetNextPageParamFunction<TopicDto[]> | undefined => {
  return (_: TopicDto[], allPages: TopicDto[][]) => {
    const allCount = allPages.flat().reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)

    return allCount < count ? allCount / TAKE : undefined
  }
}

export const useDiscussion = () => {
  const { day } = useGoalContext()
  const getNextPageParam = partialGetNextPageParam(day.topicCount)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['discussion', day.id],
    ({ pageParam = 0 }) => TopicService.get({ day: day.id }, pageParam, TAKE),
    {
      getNextPageParam,
      enabled: !!day.topicCount,
    },
  )
  const topics = data?.pages.flat() || []
  const checkOnLoadMore = partialCheckOnLoadMore(topics.length, hasNextPage, PRELOAD_DIFF)

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}
