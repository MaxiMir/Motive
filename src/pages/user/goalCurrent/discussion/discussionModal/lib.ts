import { useMemo } from 'react'
import { GetNextPageParamFunction, useInfiniteQuery } from 'react-query'
import { TopicDto, getTopics } from 'shared/api'
import { partialCheckOnLoadMore } from 'shared/lib/utils'

const TAKE = 20
const PRELOAD_DIFF = 5

function partialGetNextPageParam(count: number): GetNextPageParamFunction<TopicDto[]> {
  return (_, allPages) => {
    const allCount = allPages.flat().reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)

    return allCount < count ? allCount / TAKE : undefined
  }
}

export function useDiscussion(dayId: number, count: number) {
  const getNextPageParam = partialGetNextPageParam(count)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['discussion', dayId],
    ({ pageParam = 0 }) => getTopics({ where: { day: dayId }, page: pageParam, take: TAKE }),
    {
      getNextPageParam,
      enabled: !!count,
    },
  )
  const topics = useMemo(() => data?.pages.flat() || [], [data?.pages])
  const checkOnLoadMore = partialCheckOnLoadMore(topics.length, PRELOAD_DIFF, hasNextPage)

  return { isLoading, topics, checkOnLoadMore, fetchNextPage }
}
