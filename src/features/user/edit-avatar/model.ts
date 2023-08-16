import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserBaseDto, UserPageDto, updateAvatar } from 'shared/api'

export function useEditAvatar(userId: number) {
  const [page, mutatePage] = useUserPageCache()

  return useMutation((formData: FormData) => updateAvatar(userId, formData), {
    onSuccess(dto) {
      mutatePage(getNextState(page, dto))
    },
  })
}

function getNextState(page: UserPageDto, user: UserBaseDto) {
  return produce(page, (draft) => {
    draft.avatar = user.avatar
  })
}
