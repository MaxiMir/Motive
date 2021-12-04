import { InfiniteKeyLoader } from 'swr/infinite/dist/infinite/types'
import { Discussion, Topic } from 'dto'
import PageService from 'services/PageService'

const LIMIT = 10
const PRELOAD_END_INDEX = 3

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
export const getSWRKey = (dayId: string, topicCount: number): InfiniteKeyLoader => {
  return (page: number, previousData: Discussion) => {
    if (!topicCount || previousData?.last) {
      return null // reached the end or discussion is empty
    }

    return `/days/${dayId}/discussion/?page=${page}&limit=${LIMIT}` // SWR key
  }
}

export const fetcher = (url: string): Promise<Discussion> => PageService.getURL(url)

export const checkPartialOnLoadMore = (data?: Discussion[], content?: Topic[]): ((index: number) => boolean) => {
  const allCount = content?.length

  return (index: number) =>
    !allCount || data?.[data?.length - 1].last ? false : allCount - index === PRELOAD_END_INDEX
}
