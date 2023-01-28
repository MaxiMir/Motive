import { useQuery } from 'react-query'
import { getFollowingPage } from 'shared/api'
import { Route } from 'shared/config'

export const useFollowingPage = () => {
  return useQuery(['page', Route.Following], getFollowingPage, {
    staleTime: 5_000,
  })
}
