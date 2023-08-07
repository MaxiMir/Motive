import { produce } from 'immer'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { UserBaseDto, UserPageDto, deleteAvatar } from 'shared/api'

export function useDeleteAvatar(userId: number) {
  const [page, mutatePage] = useUserPageCache()

  return useMutation(() => deleteAvatar(userId), {
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
