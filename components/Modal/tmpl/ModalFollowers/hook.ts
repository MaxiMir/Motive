import useSWRInfinite from 'swr/infinite'
import { UserDetailDto, UserDto } from 'dto'
import { fetcher, getSWRKey, partialCheckOnLoadMore } from './helper'

export default function useFollowers(user: UserDetailDto): {
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
} {
  const { id, characteristic } = user
  const { data, size, setSize } = useSWRInfinite(getSWRKey(id), fetcher, {
    initialSize: !characteristic.followers ? 0 : 1,
    revalidateFirstPage: false,
  })
  const followers = data?.flat()
  const checkOnLoadMore = partialCheckOnLoadMore(followers, characteristic.followers)

  const onLoadMore = () => setSize(size + 1)

  return { followers, onLoadMore, checkOnLoadMore }
}
