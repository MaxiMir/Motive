import produce from 'immer'
import { useMutateUserPage } from '@pages/user/hooks/useMutateUserPage'
import { UserPageDto } from '@entities/user'
import { GoalDto } from '@entities/goal'

const getNextState = (page: UserPageDto, goals: GoalDto[]) =>
  produce(page, (draft) => {
    draft.goals = goals
  })

export const useMutateGoals = (): [GoalDto[], (goals: GoalDto[]) => void] => {
  const [page, mutatePage] = useMutateUserPage()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.goals, mutateGoals]
}
