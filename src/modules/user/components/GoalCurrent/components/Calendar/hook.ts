import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { DayDto } from 'src/common/dto'
import { DayService } from 'src/common/services/day'
import { useChangeDayUrl, useMutateGoals } from '@modules/user'
import { getGoalNextState } from './helper'

export const useChangeDay = (goalId: number): UseMutationResult<DayDto, AxiosError, number> => {
  const [goals, mutateGoals] = useMutateGoals()
  const changeDayUrl = useChangeDayUrl()

  return useMutation(DayService.getById, {
    onSuccess: (day) => {
      mutateGoals(getGoalNextState(goals, goalId, day))
      changeDayUrl(goals, goalId, day.id)
    },
  })
}
