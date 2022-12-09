import { useQueryClient } from 'react-query'
import { useUserContext } from '@modules/user/hooks/useUserContext'
import { UserPageDto } from '@features/page'

type UseMutateUserPage = () => [UserPageDto, (page: UserPageDto) => void]

export const useMutateUserPage: UseMutateUserPage = () => {
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const state = queryClient.getQueryState<UserPageDto>(nickname)

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(nickname, page)
  }

  return [state?.data as UserPageDto, mutate]
}
