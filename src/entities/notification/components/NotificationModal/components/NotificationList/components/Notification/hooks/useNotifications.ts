import { useQuery } from 'react-query'
import { NotificationService } from '@entities/notification/service'
import useClient from '@lib/hooks/useClient'

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
