import produce from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserBaseDto, UserPageDto, deleteAvatar } from 'shared/api'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useDeleteAvatar = (userId: number) => {
  const [page, mutatePage] = useUserPageCache()

  return useMutation(() => deleteAvatar(userId), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}
