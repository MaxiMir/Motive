import { useQuery } from 'react-query'
import { getRatingPage } from '@entities/pages/api/getRatingPage'
import { Route } from '@shared/config/routes'

export const useRatingPage = () => {
  return useQuery(['page', Route.Rating], getRatingPage, {
    staleTime: 30000,
  })
}
