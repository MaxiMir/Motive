import { useQuery, UseQueryResult } from 'react-query'
import { Route } from '@href'
import { RatingPageDto } from '@dto'
import PageService from '@services/page'

type UseRatingPage = () => UseQueryResult<RatingPageDto>

export const useRatingPage: UseRatingPage = () => {
  return useQuery(Route.Rating, () => PageService.get(Route.Rating), {
    staleTime: 5_000,
  })
}
