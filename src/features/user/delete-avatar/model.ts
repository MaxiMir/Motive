import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { deleteAvatar } from 'shared/api'

export function useDeleteAvatar(userId: number) {
  const [page, mutatePage] = useUserPageCache()

  return useMutation(() => deleteAvatar(userId), {
    onSuccess(res) {
      const nextState = produce(page, (draft) => {
        draft.avatar = res.avatar
      })
      mutatePage(nextState)
    },
  })
}
