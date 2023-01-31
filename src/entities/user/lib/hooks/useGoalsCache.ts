import produce from 'immer'
import { GoalDto, UserPageDto } from 'shared/api'
import { useUserPageCache } from './useUserPageCache'

const getNextState = (page: UserPageDto, goals: GoalDto[]) =>
  produce(page, (draft) => {
    draft.goals = goals
  })

export const useGoalsCache = (): [GoalDto[], (goals: GoalDto[]) => void] => {
  const [page, mutatePage] = useUserPageCache()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.goals, mutateGoals]
}
