import { useQueryClient } from 'react-query'
import { useUserContext } from '@modules/user/hooks/useUserContext'
import { UserPageDto } from '@features/page'

type UseMutateUserPage = () => [UserPageDto, (page: UserPageDto) => void]

export const useMutateUserPage: UseMutateUserPage = () => {
  const queryClient = useQueryClient()
  const ctx = useUserContext()

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(ctx.nickname, page)
  }

  return [ctx as UserPageDto, mutate]
}
