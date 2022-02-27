import { useQuery, UseQueryResult } from 'react-query'
import { RatingPageDto } from 'dto'
import PageService from 'services/PageService'

export const QUERY_KEY = 'rating'

export const useRatingPage = (): UseQueryResult<RatingPageDto> => {
  return useQuery(QUERY_KEY, () => PageService.getRating(), {
    staleTime: 30_000,
  })
}
