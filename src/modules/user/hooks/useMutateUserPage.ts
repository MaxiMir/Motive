import { useQueryClient } from 'react-query'
import { UserPageDto } from '@dto'
import useUserPageConfig from './useUserPageConfig'

type UseMutateUserPage = () => [UserPageDto, (page: UserPageDto) => void]

const useMutateUserPage: UseMutateUserPage = () => {
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const state = queryClient.getQueryState<UserPageDto>(key)

  const mutate = (page: UserPageDto) => {
    queryClient.setQueryData(key, page)
  }

  return [state?.data as UserPageDto, mutate]
}

export default useMutateUserPage
