import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto } from '@dto'
import { AxiosError } from 'axios'
import { DayService } from '@services/day'

export const useIncreaseViews = (goal: GoalDto, clientId?: number): UseMutationResult<void, AxiosError, void> => {
  const { id } = goal.day
  const enabled = !!clientId && clientId !== goal.owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(id)))
}
