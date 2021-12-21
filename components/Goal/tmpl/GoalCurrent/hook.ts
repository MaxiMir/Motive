import produce from 'immer'
import { Goal } from 'dto'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'
import { getQueryNewState } from './helper'

export default function useChangeDate(goalId: number): [boolean, (dayId: number) => void] {
  const [goals, mutateGoals] = useMutateGoals()
  const { isLoading, send } = useSend(GoalService.getById, {
    onSuccess: (changedGoal) => {
      mutateGoals(
        produce(goals, (draft: Goal[]) => {
          draft[draft.findIndex((g) => g.id === goalId)] = changedGoal
        }),
      )
      window.history.pushState(null, '', getQueryNewState(goals, changedGoal))
    },
  })

  const onChangeDate = (dayId: number) => send({ dayId })

  return [isLoading, onChangeDate]
}
