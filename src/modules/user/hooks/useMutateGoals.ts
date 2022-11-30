import produce from 'immer'
import { GoalDto, UserPageDto } from '@dto'
import useMutateUserPage from './useMutateUserPage'

const getNextState = (page: UserPageDto, goals: GoalDto[]) =>
  produce(page, (draft) => {
    draft.content.goals = goals
  })

type UseMutateGoals = () => [GoalDto[], (goals: GoalDto[]) => void]

const useMutateGoals: UseMutateGoals = () => {
  const [page, mutatePage] = useMutateUserPage()

  const mutateGoals = (goals: GoalDto[]) => {
    mutatePage(getNextState(page, goals))
  }

  return [page.content.goals, mutateGoals]
}

export default useMutateGoals
