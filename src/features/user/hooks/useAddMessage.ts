import { InfiniteData, useQueryClient } from 'react-query'
import { GoalDto, TopicDto } from '@dto'
import useMutateGoals from '@features/user/hooks/useMutateGoals'
import produce from 'immer'

const getNextState = (discussion: InfiniteData<TopicDto[]>, topic: TopicDto) => {
  return produce(discussion, (draft) => {
    if (!topic.answer) {
      draft.pages = [[topic], ...draft.pages]
      return
    }

    const draftTopic = draft.pages.flat().find((t) => t.id === topic.id)

    if (draftTopic) {
      draftTopic.answer = topic.answer
    }
  })
}

const getGoalNextState = (goalId: number, goals: GoalDto[]) =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day.topicCount += 1
  })

const useAddMessage = () => {
  const queryClient = useQueryClient()
  const [goals, mutateGoals] = useMutateGoals()

  return (topic: TopicDto) => {
    const { goalId, dayId } = topic
    mutateGoals(getGoalNextState(goalId, goals))
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', dayId],
      (prev) => prev && getNextState(prev, topic),
    )
  }
}

export default useAddMessage
