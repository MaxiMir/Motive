import { useQueryClient } from 'react-query'
import { UserPageDto } from '@dto'
import { useUserContext } from '@features/user/hooks/useUserContext'

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
