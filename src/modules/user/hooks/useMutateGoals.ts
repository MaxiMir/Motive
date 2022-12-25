import produce from 'immer'
import { useMutateUserPage } from '@modules/user/hooks/useMutateUserPage'
import { UserPageDto } from '@features/page'
import { GoalDto } from '@features/goal'

const getNextState = (page: UserPageDto, goals: GoalDto[]): UserPageDto =>
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
