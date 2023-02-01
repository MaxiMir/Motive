import { useMutation } from 'react-query'
import { useClient } from 'entities/user'
import { incrementDayViews } from 'shared/api'

export const useIncreaseViews = (ownerId: number, dayId: number) => {
  const client = useClient()
  const enabled = client && client?.id !== ownerId

  return useMutation(() => (!enabled ? Promise.resolve() : incrementDayViews(dayId)))
}
