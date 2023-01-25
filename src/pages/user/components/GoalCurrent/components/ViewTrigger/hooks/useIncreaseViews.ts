import { useMutation } from 'react-query'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { DayService } from '@entities/day'
import useClient from '@lib/hooks/useClient'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(day.id)))
}
