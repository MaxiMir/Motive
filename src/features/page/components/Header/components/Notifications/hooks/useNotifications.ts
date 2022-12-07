import { useQuery } from 'react-query'
import NotificationService from '@services/notification'
import useClient from '@hooks/useClient'

export const useNotifications = () => {
  const client = useClient()

  return useQuery(['notifications', client?.id], () => NotificationService.get({ recipient: client?.id || 0 }), {
    staleTime: 15_000,
  })
}
