import { useQuery } from 'react-query'
import { Route } from '@href'
import { PageService } from '@features/page'

export const useRatingPage = () => {
  return useQuery(Route.Rating, PageService.getRating, {
    staleTime: 5_000,
  })
}
