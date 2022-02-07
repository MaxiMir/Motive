import { useQuery, UseQueryResult } from 'react-query'
import { SubscriptionPageDto } from 'dto'
import PageService from 'services/PageService'

export const QUERY_KEY = 'following'

export const useFollowingPage = (): UseQueryResult<SubscriptionPageDto> =>
  useQuery(QUERY_KEY, PageService.getFollowing, {
    staleTime: 30_000,
  })
