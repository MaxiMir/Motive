import { useMutation, UseMutationResult } from 'react-query'
import { GoalDto } from 'src/common/dto'
import { AxiosError } from 'axios'
import { DayService } from 'src/common/services/day'

export const useIncreaseViews = (goal: GoalDto, clientId?: number): UseMutationResult<void, AxiosError, void> => {
  const { id } = goal.day
  const enabled = !!clientId && clientId !== goal.owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(id)))
}
