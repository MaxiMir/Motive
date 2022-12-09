import { useMutation } from 'react-query'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { DayService } from '@features/day'
import useClient from '@hooks/useClient'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(day.id)))
}
