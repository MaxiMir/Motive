import { produce } from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useViewer } from 'entities/viewer'
import { NotificationDto, updateRead } from 'shared/api'

export function useUpdateRead() {
  const queryClient = useQueryClient()
  const viewer = useViewer()

  return useMutation(updateRead, {
    onSuccess(_, id) {
      queryClient.setQueryData<NotificationDto[] | undefined>(
        ['notifications', viewer?.id],
        (prev) =>
          !prev
            ? undefined
            : produce(prev, (draft) => {
                const draftNotification = draft.find((d) => d.id === id)

                if (!draftNotification) return

                draftNotification.read = true
              }),
      )
    },
  })
}
