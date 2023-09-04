import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { updateAvatar } from 'shared/api'

export function useEditAvatar(userId: number) {
  const [page, mutatePage] = useUserPageCache()

  return useMutation((formData: FormData) => updateAvatar(userId, formData), {
    onSuccess(res) {
      const nextState = produce(page, (draft) => {
        draft.avatar = res.avatar
      })
      mutatePage(nextState)
    },
  })
}
