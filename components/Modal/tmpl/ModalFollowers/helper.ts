import { InfiniteKeyLoader } from 'swr/infinite/dist/infinite/types'
import { UserDto } from 'dto'
import { getSkip } from 'helpers/swr'
import PageService from 'services/PageService'

const LIMIT = 20
const PRELOAD_DIFF = 5

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
export const getSWRKey = (userId: number): InfiniteKeyLoader => {
  return (index: number, previousData: UserDto[] | null) => {
    if (previousData && previousData.length < LIMIT) {
      return null // reached the end or discussion is empty
    }

    const skip = getSkip(index + 1, LIMIT) // TODO back

    return `/subscriptions/${userId}/followers?skip=${skip}&take=${LIMIT}` // SWR key
  }
}

export const fetcher = (url: string): Promise<UserDto[]> => PageService.getURL(url)

export const partialCheckOnLoadMore = (content: UserDto[] | undefined, count: number): ((index: number) => boolean) => {
  const loaded = content?.length || 0

  return (index: number) => !!count && loaded < count && loaded - index === PRELOAD_DIFF
}
