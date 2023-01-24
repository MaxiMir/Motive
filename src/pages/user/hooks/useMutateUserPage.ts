import { useQueryClient } from 'react-query'
import { useUserContext } from '@pages/user/hooks/useUserContext'
import { UserPageDto } from '@entities/user'

export const useMutateUserPage = (): [UserPageDto, (page: UserPageDto) => void] => {
  const queryClient = useQueryClient()
  const ctx = useUserContext()

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(['page', ctx.nickname], page)
  }

  return [ctx, mutate]
}
