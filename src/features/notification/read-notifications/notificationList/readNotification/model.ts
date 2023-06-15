import { produce } from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useClient } from 'entities/viewer'
import { NotificationDto, updateRead } from 'shared/api'

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
