import useSWR from 'swr'
import { GoalDto, UserBaseDto } from 'dto'
import DayService from 'services/DayService'

export default function useIncreaseViews(client: UserBaseDto, goal: GoalDto): void {
  const dayId = goal.days[0].id
  const swrKey = !client.id || client.id === goal.owner.id ? null : `views-${dayId}`
  useSWR(swrKey, () => DayService.incrementViews({ id: dayId }), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
