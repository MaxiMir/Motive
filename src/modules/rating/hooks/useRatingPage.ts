import { useQuery } from 'react-query'
import { Route } from '@href'
import PageService from '@services/page'

export const useRatingPage = () => {
  return useQuery(Route.Rating, () => PageService.get(Route.Rating), {
    staleTime: 5_000,
  })
}
