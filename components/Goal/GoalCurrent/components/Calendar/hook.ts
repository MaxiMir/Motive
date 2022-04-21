import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { DayDto } from 'dto'
import DayService from 'services/DayService'
import { useChangeDayUrl, useMutateGoals } from 'views/UserView/hook'
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
