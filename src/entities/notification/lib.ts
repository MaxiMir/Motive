import { useQuery } from 'react-query'
import { getNotifications } from 'shared/api'

export const useNotifications = (recipient = 0) => {
  return useQuery(['notifications', recipient], () => getNotifications({ recipient }), {
    staleTime: 5_000,
    enabled: !!recipient,
  })
}
