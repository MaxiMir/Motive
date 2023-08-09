import { produce } from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useClient } from 'entities/viewer'
import { NotificationDto, updateRead } from 'shared/api'

export function useUpdateRead() {
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

function getNextState(notifications: NotificationDto[], id: number) {
  return produce(notifications, (draft) => {
    const draftNotification = draft.find((d) => d.id === id)

    if (!draftNotification) return

    draftNotification.read = true
  })
}
