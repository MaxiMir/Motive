import produce from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserBaseDto, UserPageDto, updateAvatar } from 'shared/api'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useUpdateAvatar = (userId: number) => {
  const [page, mutatePage] = useUserPageCache()

  return useMutation((formData: FormData) => updateAvatar(userId, formData), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}