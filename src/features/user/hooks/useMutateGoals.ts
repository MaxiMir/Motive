import produce from 'immer'
import { GoalDto, UserPageDto } from '@dto'
import { useMutateUserPage } from '@features/user/hooks/useMutateUserPage'

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
