import { GetNextPageParamFunction } from 'react-query'

export const partialGetNextPageParam = <T>(count: number, take: number): GetNextPageParamFunction<T[]> | undefined => {
  return (_: T[], allPages: T[][]) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / take : undefined
  }
}

export const partialCheckOnLoadMore = (count: number, hasNextPage: boolean | undefined, preloadDiff: number) => {
  return (index: number) => !!hasNextPage && count - index === preloadDiff
}
