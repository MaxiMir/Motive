import produce from 'immer'
import useSWRInfinite from 'swr/infinite'
import { GoalDto, TopicDto } from 'dto'
import { getTopicsKey, partialCheckOnLoadMore } from 'helpers/swr'
import { useMutateGoals } from 'views/UserView/hook'
import { fetcher, getTopicsCount, mergeTopics } from './helper'

export default function useDiscussion(
  goalId: number,
  dayId: number,
  count: number,
): {
  topics?: TopicDto[]
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
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const [draftDay] = draft[draft.findIndex((g) => g.id === goalId)].days
        draftDay.topicCount += 1
      }),
    )
  }

  return { topics, onLoadMore, checkOnLoadMore, onAdd }
}
