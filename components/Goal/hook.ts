import useSWR from 'swr'
import { GoalDto, UserBaseDto } from 'dto'
import DayService from 'services/DayService'

export default function useIncreaseViews(goal: GoalDto, client?: UserBaseDto): void {
  const { id } = goal.day
  const swrKey = !client?.id || client.id === goal.owner.id ? null : `views-${id}`
  useSWR(swrKey, () => DayService.incrementViews({ id }), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
