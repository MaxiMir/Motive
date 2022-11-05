import { useQuery, UseQueryResult } from 'react-query'
import { NotificationDto } from '@dto'
import { NotificationService } from '@services/notification'
import useClient from '@hooks/useClient'

export const useNotifications = (): UseQueryResult<NotificationDto[]> => {
  const client = useClient()

  return useQuery(['notifications', client?.id], () => NotificationService.get({ recipient: client?.id || 0 }), {
    staleTime: 15_000,
  })
}
