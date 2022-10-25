import { useMutation, useQueryClient, UseMutationResult } from 'react-query'
import { AxiosError } from 'axios'
import { NotificationDto } from 'src/common/dto'
import { NotificationService } from 'src/common/services/notification'
import useClient from 'src/common/hooks/useClient'
import { getNextState } from 'src/common/helpers/notification'

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
