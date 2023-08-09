import { GetNextPageParamFunction } from 'react-query'

export function partialGetNextPageParam<T>(
  count: number,
  take: number,
): GetNextPageParamFunction<T[]> {
  return (_, allPages) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / take : undefined
  }
}

export function partialCheckOnLoadMore(count: number, preloadDiff: number, hasNextPage?: boolean) {
  return (index: number) => !!hasNextPage && count - index === preloadDiff
}
