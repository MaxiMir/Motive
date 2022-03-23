import { useQuery } from 'react-query'
import { GoalDto } from 'dto'
import DayService from 'services/DayService'

export const useIncreaseViews = (goal: GoalDto, clientId?: number): void => {
  const { id } = goal.day

  useQuery(['views', id, clientId], () => DayService.incrementViews(id), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!clientId && clientId !== goal.owner.id,
  })
}
