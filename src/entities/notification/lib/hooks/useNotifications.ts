import { useQuery } from 'react-query'
import { getNotifications } from '@entities/notification/api/getNotifications'
import { useClient } from '@entities/user'

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
