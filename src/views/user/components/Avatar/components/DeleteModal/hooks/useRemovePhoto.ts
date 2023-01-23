import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage, useUserContext } from '@views/user/hooks'
import { UserBaseDto, UserService } from '@modules/user'
import { UserPageDto } from '@modules/page'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
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
