import { useQuery } from 'react-query'
import useClient from '@shared/lib/hooks/useClient'
import { getNotifications } from '@entities/notification/api/getNotifications'

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
