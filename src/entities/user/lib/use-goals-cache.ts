import { produce } from 'immer'
import { GoalDto } from 'shared/api'
import { useUserPageCache } from './use-user-page-cache'

export function useGoalsCache() {
  const [page, mutatePage] = useUserPageCache()

  const mutateGoals = (goals: GoalDto[]) => {
    const nextState = produce(page, (draft) => {
      draft.goals = goals
    })
    mutatePage(nextState)
  }

  return [page.goals, mutateGoals] as const
}
