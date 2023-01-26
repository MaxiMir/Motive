import { useQueryClient } from 'react-query'
import { useUserContext } from '@entities/user'
import { UserPageDto } from '@shared/api/dto'

export const useMutateUserPage = (): [UserPageDto, (page: UserPageDto) => void] => {
  const queryClient = useQueryClient()
  const ctx = useUserContext()

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(['page', ctx.nickname], page)
  }

  return [ctx, mutate]
}
