import { InfiniteKeyLoader } from 'swr/infinite/dist/infinite/types'
import { UserDto } from 'dto'
import PageService from 'services/PageService'

const LIMIT_USERS = 20
const PRELOAD_DIFF_USERS = 5

export const fetcher = (url: string): Promise<UserDto[]> => PageService.getURL(url)

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getKey = (urn: string, limit: number): InfiniteKeyLoader => {
  return (index: number, previousData: UserDto[] | null) => {
    if (previousData && previousData.length < limit) {
      return null // reached the end or discussion is empty
    }

    return `${urn}?skip=${index * LIMIT_USERS}&take=${limit}` // SWR key
  }
}

export const getFollowersKey = (userId: number): InfiniteKeyLoader =>
  getKey(`/subscriptions/${userId}/followers`, LIMIT_USERS)

export const partialCheckOnLoadMore = (loaded: number, count: number): ((index: number) => boolean) => {
  return (index: number) => !!count && loaded < count && loaded - index === PRELOAD_DIFF_USERS
}
