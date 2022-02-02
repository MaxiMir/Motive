import useSWRInfinite from 'swr/infinite'
import { TopicDto } from 'dto'
import { getTopicsKey, partialCheckOnLoadMore } from 'helpers/swr'
import { useMutateGoals } from 'views/UserView/hook'
import { fetcher, getTopicsCount, changeGoals, mergeTopics } from './helper'

export default function useDiscussion(
  goalId: number,
  dayId: number,
  count: number,
): {
  topics: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
  onAdd: (topic: TopicDto) => void
} {
  const [goals, mutateGoals] = useMutateGoals()
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
    mutateGoals(changeGoals(goalId, goals))
  }

  return { topics, onLoadMore, checkOnLoadMore, onAdd }
}
