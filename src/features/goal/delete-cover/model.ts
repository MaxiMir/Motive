import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { deleteCover } from 'shared/api'

export function useDeleteCover(goalId: number) {
  const [goals, mutateGoals] = useGoalsCache()

  return useMutation(() => deleteCover(goalId), {
    onSuccess(res) {
      const nextState = produce(goals, (draft) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === res.id)]
        draftGoal.cover = res.cover
      })
      mutateGoals(nextState)
    },
  })
}
