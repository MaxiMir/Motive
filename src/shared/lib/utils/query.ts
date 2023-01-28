import { GetNextPageParamFunction } from 'react-query'

export const partialGetNextPageParam = <T>(
  count: number,
  take: number,
): GetNextPageParamFunction<T[]> => {
  return (_, allPages) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / take : undefined
  }
}

type CheckOnLoadMore = (index: number) => boolean

export const partialCheckOnLoadMore = (
  count: number,
  preloadDiff: number,
  hasNextPage?: boolean,
): CheckOnLoadMore => {
  return (index) => !!hasNextPage && count - index === preloadDiff
}
