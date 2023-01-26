import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { updateRead } from '@entities/notification/api/updateRead'
import { useClient } from '@entities/user'
import { NotificationDto } from '@shared/api/dto'

const getNextState = (notifications: NotificationDto[], id: number) =>
  produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })

export const useUpdateRead = () => {
  const queryClient = useQueryClient()
  const client = useClient()

  return useMutation(updateRead, {
    onSuccess(_, id) {
      queryClient.setQueryData<NotificationDto[] | undefined>(
        ['notifications', client?.id],
        (prev) => prev && getNextState(prev, id),
      )
    },
  })
}
