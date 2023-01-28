import { useQuery } from 'react-query'
import { useClient } from 'entities/user'
import { getNotifications } from 'shared/api'

export const useNotifications = () => {
  const client = useClient()

  return useQuery(
    ['notifications', client?.id],
    () => getNotifications({ recipient: client?.id || 0 }),
    {
      staleTime: 5_000,
    },
  )
}
