import { useQuery } from 'react-query'
import { GoalDto, UserBaseDto } from 'dto'
import DayService from 'services/DayService'

export default function useIncreaseViews(goal: GoalDto, client?: UserBaseDto): void {
  const { id } = goal.day

  useQuery(['views', id], () => DayService.incrementViews({ id }), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: client && client.id !== goal.owner.id,
  })
}
