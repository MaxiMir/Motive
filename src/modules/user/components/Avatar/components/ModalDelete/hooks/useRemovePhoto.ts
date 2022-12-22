import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage, useUserContext } from '@modules/user/hooks'
import { UserBaseDto, UserService } from '@features/user'
import { UserPageDto } from '@features/page'

const getNextState = (page: UserPageDto, user: UserBaseDto): UserPageDto =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useRemovePhoto = () => {
  const { id } = useUserContext()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation(() => UserService.deleteAvatar(id), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}
