import { useMutation } from 'react-query'
import DayService from 'services/DayService'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutateGoals } from 'views/UserView/hook'
import { getGoalNextState } from './helper'

export default function useChangeDay(goalId: number): [boolean, (dayId: number) => void] {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, mutate } = useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })

  return [isLoading, mutate]
}
