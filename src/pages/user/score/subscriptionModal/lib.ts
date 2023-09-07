import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import { getSubscription } from 'shared/api'
import { toGetNextPageParam } from 'shared/lib/utils'

const TAKE = 20

type Type = 'following' | 'followers'

export function useSubscription(userId: number, count: number, type: Type) {
  const getNextPageParam = toGetNextPageParam(count, TAKE)

  return useInfiniteQuery(
    [type, userId, count],
    ({ pageParam = 0 }: QueryFunctionContext) =>
      getSubscription(userId, type, { page: pageParam, take: TAKE }),
    { getNextPageParam, enabled: !!count },
  )
}
