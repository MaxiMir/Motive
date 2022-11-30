import { useMutation } from 'react-query'
import { GoalDto } from '@dto'
import DayService from '@services/day'

const useIncreaseViews = (goal: GoalDto, clientId?: number) => {
  const { id } = goal.day
  const enabled = !!clientId && clientId !== goal.owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(id)))
}

export default useIncreaseViews
