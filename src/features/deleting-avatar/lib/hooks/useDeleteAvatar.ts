import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage } from '@pages/user/hooks'
import { deleteAvatar } from '@entities/user'
import { UserBaseDto, UserPageDto } from '@shared/api/user'

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
