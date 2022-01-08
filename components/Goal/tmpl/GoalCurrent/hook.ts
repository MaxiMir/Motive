import produce from 'immer'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'
import { getQueryNewState } from './helper'

export default function useChangeDate(goalId: number): [boolean, (dayId: number) => void] {
  const [goals, mutateGoals] = useMutateGoals()

  const { isLoading, send } = useSend(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]

          draftGoal.days = [day]
        }),
      )
      window.history.pushState(null, '', getQueryNewState(goals, goalId, day.id))
    },
  })

  const onChangeDate = (dayId: number) => send({ id: dayId })

  return [isLoading, onChangeDate]
}
