import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage } from '@pages/user/hooks'
import { UserBaseDto, UserPageDto, deleteAvatar } from '@entities/user'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useDeleteAvatar = (userId: number) => {
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(() => deleteAvatar(userId), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}
