import { useQuery, UseQueryResult } from 'react-query'
import { RatingPageDto } from '@dto'
import { RATING } from '@links'
import { PageService } from '@services/page'

export function useRatingPage(): UseQueryResult<RatingPageDto> {
  return useQuery(RATING, () => PageService.get(RATING), {
    staleTime: 5_000,
  })
}
