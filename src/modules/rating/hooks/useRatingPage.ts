import { useQuery } from 'react-query'
import { Route } from '@href'
import { PageService } from '@features/page'

export const useRatingPage = () => {
  return useQuery(['page', Route.Rating], PageService.getRating, {
    staleTime: 30000,
  })
}
