import { useQuery, UseQueryResult } from 'react-query'
import { SubscriptionPageDto } from 'dto'
import { FOLLOWING } from 'route'
import PageService from 'services/PageService'

export default function useFollowingPage(): UseQueryResult<SubscriptionPageDto> {
  return useQuery(FOLLOWING, () => PageService.get(FOLLOWING), {
    staleTime: 5_000,
  })
}
