import { useQuery } from 'react-query'
import { NotificationService } from '@modules/notification/service'
import useClient from '@hooks/useClient'

export const useNotifications = () => {
  const client = useClient()

  return useQuery(
    ['notifications', client?.id],
    () => NotificationService.get({ recipient: client?.id || 0 }),
    {
      staleTime: 5_000,
    },
  )
}
