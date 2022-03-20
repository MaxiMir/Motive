import { useQuery, UseQueryResult } from 'react-query'
import { RatingPageDto } from 'dto'
import { RATING } from 'route'
import PageService from 'services/PageService'

export default function useRatingPage(): UseQueryResult<RatingPageDto> {
  return useQuery(RATING, () => PageService.get(RATING), {
    staleTime: 30_000,
  })
}
