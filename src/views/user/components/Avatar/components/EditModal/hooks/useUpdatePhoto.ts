import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage, useUserContext } from '@views/user/hooks'
import { UserBaseDto, UserService } from '@modules/user'
import { UserPageDto } from '@modules/page'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useUpdatePhoto = () => {
  const { id } = useUserContext()
  const [page, mutatePage] = useMutateUserPage()

  return useMutation((formData: FormData) => UserService.updateAvatar(id, formData), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}
