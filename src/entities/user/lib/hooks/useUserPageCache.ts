import { useQueryClient } from 'react-query'
import { UserPageDto } from 'shared/api'
import { useUserContext } from './useUserContext'

export const useUserPageCache = () => {
  const queryClient = useQueryClient()
  const ctx = useUserContext()

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(['page', ctx.nickname], page)
  }

  return [ctx, mutate] as const
}
