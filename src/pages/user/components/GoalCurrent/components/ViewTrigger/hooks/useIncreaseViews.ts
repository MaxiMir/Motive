import { useMutation } from 'react-query'
import useClient from '@lib/hooks/useClient'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { incrementDayViews } from '@entities/day'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : incrementDayViews(day.id)))
}
