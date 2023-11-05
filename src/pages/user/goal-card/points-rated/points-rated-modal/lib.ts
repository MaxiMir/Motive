import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import { DayDto, getDayPoints } from 'shared/api'
import { toGetNextPageParam } from 'shared/lib/utils'

const TAKE = 20

export function usePointsRated(day: DayDto) {
  const { id, pointsRated } = day
  const getNextPageParam = toGetNextPageParam(pointsRated, TAKE)

  return useInfiniteQuery(
    [id, pointsRated],
    ({ pageParam = 0 }: QueryFunctionContext) =>
      getDayPoints({ where: { day: id }, page: pageParam, take: TAKE }),
    { getNextPageParam, enabled: pointsRated > 0 },
  )
}
