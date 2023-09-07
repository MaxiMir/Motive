import { GetNextPageParamFunction, useInfiniteQuery } from 'react-query'
import { TopicDto, getTopics, DayDto } from 'shared/api'

const TAKE = 20

function toGetNextPageParam(count: number): GetNextPageParamFunction<TopicDto[]> {
  return (_, allPages) => {
    const allCount = allPages.flat().reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)

    return allCount < count ? allCount / TAKE : undefined
  }
}

export function useDiscussion(day: DayDto) {
  const getNextPageParam = toGetNextPageParam(day.topicCount)

  return useInfiniteQuery(
    ['discussion', day.id],
    ({ pageParam = 0 }) => getTopics({ where: { day: day.id }, page: pageParam, take: TAKE }),
    { getNextPageParam, enabled: !!day.topicCount },
  )
}
