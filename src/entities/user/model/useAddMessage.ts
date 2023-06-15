import { produce } from 'immer'
import { InfiniteData, useQueryClient } from 'react-query'
import { GoalDto, TopicDto } from 'shared/api'
import { useGoalsCache } from './useGoalsCache'

const getTopicNextState = (discussion: InfiniteData<TopicDto[]>, topic: TopicDto) =>
  produce(discussion, (draft) => {
    if (!topic.answer) {
      draft.pages = [[topic], ...draft.pages]
      return
    }

    const draftTopic = draft.pages.flat().find((t) => t.id === topic.id)

    if (draftTopic) {
      draftTopic.answer = topic.answer
    }
  })

const getGoalNextState = (goalId: number, goals: GoalDto[]) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day.topicCount += 1
  })

export const useAddMessage = () => {
  const queryClient = useQueryClient()
  const [goals, mutateGoals] = useGoalsCache()

  return (topic: TopicDto) => {
    const { goalId, dayId } = topic
    mutateGoals(getGoalNextState(goalId, goals))
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', dayId],
      (prev) => prev && getTopicNextState(prev, topic),
    )
  }
}
