import { useQuery } from 'react-query'
import { Route } from '@href'
import PageService from '@services/page'

export const useFollowingPage = () => {
  return useQuery(Route.Following, () => PageService.get(Route.Following), {
    staleTime: 5_000,
  })
}
