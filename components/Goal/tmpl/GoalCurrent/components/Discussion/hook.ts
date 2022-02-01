import useSWRInfinite from 'swr/infinite'
import { TopicDto } from 'dto'
import { getTopicsKey, partialCheckOnLoadMore } from 'helpers/swr'
import { fetcher, getTopicsCount, mergeTopics } from './helper'

export default function useDiscussion(
  dayId: number,
  count: number,
): {
  topics: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
  onAdd: (topic: TopicDto) => void
} {
  const {
    data = [],
    size,
    setSize,
    mutate,
  } = useSWRInfinite(getTopicsKey(dayId), fetcher, {
    initialSize: !count ? 0 : 1,
  })
  const topics = data.flat()
  const topicsWithAnswers = getTopicsCount(topics)
  const checkOnLoadMore = partialCheckOnLoadMore(topicsWithAnswers, count)

  const onLoadMore = () => setSize(size + 1)

  const onAdd = async (topic: TopicDto) => {
    await mutate(mergeTopics(data, topic), false)
  }

  return { topics, onLoadMore, checkOnLoadMore, onAdd }
}
