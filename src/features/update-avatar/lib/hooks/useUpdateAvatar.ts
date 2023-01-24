import produce from 'immer'
import { useMutation } from 'react-query'
import { useMutateUserPage } from '@pages/user/hooks'
import { updateAvatar } from '@entities/user/api/updateAvatar'
import { UserBaseDto, UserPageDto } from '@entities/user/model/dto'

const getNextState = (page: UserPageDto, user: UserBaseDto) =>
  produce(page, (draft) => {
    draft.avatar = user.avatar
  })

export const useUpdateAvatar = (userId: number) => {
  const [page, mutatePage] = useMutateUserPage()

  return useMutation((formData: FormData) => updateAvatar(userId, formData), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}
