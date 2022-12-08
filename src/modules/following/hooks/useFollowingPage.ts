import { useQuery } from 'react-query'
import { Route } from '@href'
import { PageService } from '@features/page'

export const useFollowingPage = () => {
  return useQuery(Route.Following, PageService.getFollowing, {
    staleTime: 5_000,
  })
}
