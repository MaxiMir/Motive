import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { updateCover } from 'shared/api'

export function useEditCover(goalId: number) {
  const [goals, mutateGoals] = useGoalsCache()

  return useMutation((formData: FormData) => updateCover(goalId, formData), {
    onSuccess(res) {
      const nextState = produce(goals, (draft) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === res.id)]
        draftGoal.cover = res.cover
      })
      mutateGoals(nextState)
    },
  })
}
