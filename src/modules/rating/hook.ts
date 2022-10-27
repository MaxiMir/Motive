import { useQuery, UseQueryResult } from 'react-query'
import { RatingPageDto } from '@dto'
import { Route } from '@href'
import { PageService } from '@services/page'

export function useRatingPage(): UseQueryResult<RatingPageDto> {
  return useQuery(Route.Rating, () => PageService.get(Route.Rating), {
    staleTime: 5_000,
  })
}
