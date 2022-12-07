import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { NotificationDto } from '@dto'
import NotificationService from '@services/notification'
import useClient from '@hooks/useClient'

const getNextState = (notifications: NotificationDto[], id: number) =>
  produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })

export const useUpdateRead = () => {
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
