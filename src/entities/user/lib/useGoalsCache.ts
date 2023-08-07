import { produce } from 'immer'
import { GoalDto, UserPageDto } from 'shared/api'
import { useUserPageCache } from './useUserPageCache'

export function useGoalsCache() {
  const [page, mutatePage] = useUserPageCache()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.goals, mutateGoals] as const
}

function getNextState(page: UserPageDto, goals: GoalDto[]) {
  return produce(page, (draft) => {
    draft.goals = goals
  })
}
