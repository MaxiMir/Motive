import { useMutation } from 'react-query'
import { incrementDayViews } from '@entities/day'
import { useGoalContext } from '@entities/goal'
import { useClient } from '@entities/user'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : incrementDayViews(day.id)))
}
