import { useQuery } from 'react-query'
import { getRatingPage } from 'shared/api'
import { Route } from 'shared/config'

export function useRatingPage() {
  return useQuery(['page', Route.Rating], getRatingPage, {
    staleTime: 30000,
  })
}
