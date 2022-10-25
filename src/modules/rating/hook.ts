import { useQuery, UseQueryResult } from 'react-query'
import { RatingPageDto } from 'src/common/dto'
import { RATING } from 'route'
import { PageService } from 'src/common/services/page'

export function useRatingPage(): UseQueryResult<RatingPageDto> {
  return useQuery(RATING, () => PageService.get(RATING), {
    staleTime: 5_000,
  })
}
