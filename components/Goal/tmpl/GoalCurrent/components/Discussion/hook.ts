import useSWRInfinite from 'swr/infinite'
import { TopicDto } from 'dto'
import { getTopicsKey, partialCheckOnLoadMore } from 'helpers/swr'
import { fetcher } from './helper'

export default function useDiscussion(
  id: number,
  count: number,
): {
  topics?: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
  onAdd: (topic: TopicDto) => void
} {
  const { data, size, setSize, mutate } = useSWRInfinite(getTopicsKey(id), fetcher, {
    initialSize: !count ? 0 : 1,
    revalidateFirstPage: false,
  })
  const topics = data?.flat()
  const checkOnLoadMore = partialCheckOnLoadMore(topics?.length || 0, count)

  const onLoadMore = () => setSize(size + 1)

  const onAdd = (topic: TopicDto) => mutate([[topic], ...(data || [])], false)

  return { topics, onLoadMore, checkOnLoadMore, onAdd }
}
