import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { AxiosError } from 'axios'
import { NotificationDto } from 'dto'
import NotificationService from 'services/NotificationService'
import useClient from 'hooks/useClient'
import { getNextState } from './helper'

export const useUpdateRead = (): UseMutationResult<void, AxiosError, number> => {
  const queryClient = useQueryClient()
  const client = useClient()

  return useMutation(NotificationService.updateRead, {
    onSuccess(_, id) {
      queryClient.setQueryData<NotificationDto[] | undefined>(
        ['notifications', client?.id],
        (prev) => prev && getNextState(prev, id),
      )
    },
  })
}
