import useSWRInfinite from 'swr/infinite'
import { UserDetailDto, UserDto } from 'dto'
import { getFollowersKey, partialCheckOnLoadMore } from 'helpers/swr'
import { fetcher } from './helper'

export default function useFollowers(user: UserDetailDto): {
  followers?: UserDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
} {
  const { data, size, setSize } = useSWRInfinite(getFollowersKey(user.id), fetcher, {
    initialSize: !user.characteristic.followers ? 0 : 1,
    revalidateFirstPage: false,
  })
  const followers = data?.flat()
  const checkOnLoadMore = partialCheckOnLoadMore(followers?.length || 0, user.characteristic.followers)

  const onLoadMore = () => setSize(size + 1)

  return { followers, onLoadMore, checkOnLoadMore }
}
