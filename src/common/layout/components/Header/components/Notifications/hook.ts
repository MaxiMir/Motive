import { useQuery, UseQueryResult } from 'react-query'
import { NotificationDto } from 'src/common/dto'
import { NotificationService } from 'src/common/services/notification'
import useClient from 'src/common/hooks/useClient'

export const useNotifications = (): UseQueryResult<NotificationDto[]> => {
  const client = useClient()

  return useQuery(['notifications', client?.id], () => NotificationService.get({ recipient: client?.id || 0 }), {
    staleTime: 15_000,
  })
}
