import { useMemo } from 'react'
import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import { getSubscription } from 'shared/api'
import { partialCheckOnLoadMore, partialGetNextPageParam } from 'shared/lib/utils'

type Type = 'following' | 'followers'

const TAKE = 20
const PRELOAD_DIFF = 5

function partialQueryFn(userId: number, type: 'following' | 'followers') {
  return ({ pageParam = 0 }: QueryFunctionContext) => {
    return getSubscription(userId, type, { page: pageParam, take: TAKE })
  }
}

export function useSubscription(userId: number, count: number, type: Type) {
  const queryFn = partialQueryFn(userId, type)
  const getNextPageParam = partialGetNextPageParam(count, TAKE)
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [type, userId, count],
    queryFn,
    {
      getNextPageParam,
      enabled: !!count,
    },
  )
  const users = useMemo(() => data?.pages.flat() || [], [data?.pages])
  const checkOnLoadMore = partialCheckOnLoadMore(users.length, PRELOAD_DIFF, hasNextPage)

  return { isLoading, users, checkOnLoadMore, fetchNextPage }
}
