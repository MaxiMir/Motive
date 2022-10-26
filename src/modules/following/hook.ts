import { useQuery, UseQueryResult } from 'react-query'
import { SubscriptionPageDto } from '@dto'
import { FOLLOWING } from '@href'
import { PageService } from '@services/page'

export function useFollowingPage(): UseQueryResult<SubscriptionPageDto> {
  return useQuery(FOLLOWING, () => PageService.get(FOLLOWING), {
    staleTime: 5_000,
  })
}
