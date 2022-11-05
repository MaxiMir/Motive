import { useQuery, UseQueryResult } from 'react-query'
import { SubscriptionPageDto } from '@dto'
import { Route } from '@href'
import { PageService } from '@services/page'

export function useFollowingPage(): UseQueryResult<SubscriptionPageDto> {
  return useQuery(Route.Following, () => PageService.get(Route.Following), {
    staleTime: 5_000,
  })
}
