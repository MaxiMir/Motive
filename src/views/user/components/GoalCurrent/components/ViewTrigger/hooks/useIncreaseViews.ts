import { useMutation } from 'react-query'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { DayService } from '@features/day'
import useClient from '@hooks/useClient'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(day.id)))
}
