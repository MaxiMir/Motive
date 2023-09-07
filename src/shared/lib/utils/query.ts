import { GetNextPageParamFunction } from 'react-query'

export function toGetNextPageParam<T>(count: number, take: number): GetNextPageParamFunction<T[]> {
  return (_, allPages) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / take : undefined
  }
}

const PRELOAD_DIFF = 5

export function toCheckOnLoadMore(count: number, hasNextPage?: boolean) {
  return (index: number) => !!hasNextPage && count - index === PRELOAD_DIFF
}
