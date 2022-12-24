import { GetNextPageParamFunction } from 'react-query'

type PartialGetNextPageParam = <T>(
  count: number,
  take: number,
) => GetNextPageParamFunction<T[]> | undefined
type PartialCheckOnLoadMore = (
  count: number,
  hasNextPage: boolean | undefined,
  preloadDiff: number,
) => (index: number) => boolean

export const partialGetNextPageParam: PartialGetNextPageParam = (count, take) => {
  return (_, allPages) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / take : undefined
  }
}

export const partialCheckOnLoadMore: PartialCheckOnLoadMore = (count, hasNextPage, preloadDiff) => {
  return (index) => !!hasNextPage && count - index === preloadDiff
}
