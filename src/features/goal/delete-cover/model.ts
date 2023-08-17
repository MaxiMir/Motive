import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { GoalDto, GoalBaseDto, deleteCover } from 'shared/api'

export function useDeleteCover(goalId: number) {
  const [goals, mutateGoals] = useGoalsCache()

  return useMutation(() => deleteCover(goalId), {
    onSuccess(dto) {
      mutateGoals(getNextState(goals, dto))
    },
  })
}

function getNextState(goals: GoalDto[], goal: GoalBaseDto) {
  return produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
    draftGoal.cover = goal.cover
  })
}
