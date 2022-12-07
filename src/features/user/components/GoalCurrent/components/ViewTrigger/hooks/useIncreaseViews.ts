import { useMutation } from 'react-query'
import useClient from '@hooks/useClient'
import DayService from '@services/day'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : DayService.incrementViews(day.id)))
}
