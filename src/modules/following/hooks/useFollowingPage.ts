import { useQuery, UseQueryResult } from 'react-query'
import { Route } from '@href'
import { SubscriptionPageDto } from '@dto'
import PageService from '@services/page'

type UseFollowingPage = () => UseQueryResult<SubscriptionPageDto>

export const useFollowingPage: UseFollowingPage = () => {
  return useQuery(Route.Following, () => PageService.get(Route.Following), {
    staleTime: 5_000,
  })
}
