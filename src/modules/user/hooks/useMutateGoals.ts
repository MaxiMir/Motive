import produce from 'immer'
import { useMutateUserPage } from '@modules/user/hooks/useMutateUserPage'
import { UserPageDto } from '@features/page'
import { GoalDto } from '@features/goal'

const getNextState = (page: UserPageDto, goals: GoalDto[]) =>
  produce(page, (draft) => {
    draft.goals = goals
  })

type UseMutateGoals = () => [GoalDto[], (goals: GoalDto[]) => void]

export const useMutateGoals: UseMutateGoals = () => {
  const [page, mutatePage] = useMutateUserPage()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.goals, mutateGoals]
}
