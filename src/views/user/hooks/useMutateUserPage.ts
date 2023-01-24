import { useQueryClient } from 'react-query'
import { useUserContext } from '@views/user/hooks/useUserContext'
import { UserPageDto } from '@modules/page'

export const useMutateUserPage = (): [UserPageDto, (page: UserPageDto) => void] => {
  const queryClient = useQueryClient()
  const ctx = useUserContext()

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(['page', ctx.nickname], page)
  }

  return [ctx, mutate]
}
