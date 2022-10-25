import { useQuery, UseQueryResult } from 'react-query'
import { SubscriptionPageDto } from 'src/common/dto'
import { FOLLOWING } from 'route'
import { PageService } from 'src/common/services/page'

export function useFollowingPage(): UseQueryResult<SubscriptionPageDto> {
  return useQuery(FOLLOWING, () => PageService.get(FOLLOWING), {
    staleTime: 5_000,
  })
}
