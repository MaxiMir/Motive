import { useQuery } from 'react-query'
import { getFollowingPage } from '@entities/pages/api/getFollowingPage'
import { Route } from '@shared/consts/routes'

export const useFollowingPage = () => {
  return useQuery(['page', Route.Following], getFollowingPage, {
    staleTime: 5_000,
  })
}
