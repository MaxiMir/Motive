import { useMutation } from 'react-query'
import { useGoalContext } from 'entities/goal'
import { useClient } from 'entities/user'
import { incrementDayViews } from 'shared/api'

export const useIncreaseViews = () => {
  const client = useClient()
  const { owner, day } = useGoalContext()
  const enabled = client && client?.id !== owner.id

  return useMutation(() => (!enabled ? Promise.resolve() : incrementDayViews(day.id)))
}
