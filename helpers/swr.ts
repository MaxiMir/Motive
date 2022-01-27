import { InfiniteKeyLoader } from 'swr/infinite/dist/infinite/types'
import { setQueryParams } from './url'

const LIMIT_USERS = 20
const LIMIT_TOPICS = 20
const PRELOAD_DIFF = 5

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getKey = <T>(urn: string, limit: number): InfiniteKeyLoader => {
  return (index: number, previousData: T[] | null) => {
    if (previousData && previousData.length < limit) {
      return null // reached the end or discussion is empty
    }

    return setQueryParams(urn, { skip: index * limit, take: limit }) // SWR key
  }
}

export const getFollowersKey = (id: number): InfiniteKeyLoader => {
  return getKey(`/subscriptions/${id}/followers`, LIMIT_USERS)
}

export const getTopicsKey = (dayId: number): InfiniteKeyLoader => {
  return getKey(setQueryParams('/topics', { 'where[day]': dayId }), LIMIT_TOPICS)
}

export const partialCheckOnLoadMore = (loaded: number, count: number): ((index: number) => boolean) => {
  return (index: number) => !!count && loaded < count && loaded - index === PRELOAD_DIFF
}
