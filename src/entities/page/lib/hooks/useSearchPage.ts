import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getSearchPage } from 'shared/api'
import { Route } from 'shared/config'

export const useSearchPage = () => {
  const { query: params } = useRouter()

  return useQuery(['page', Route.Search], () => getSearchPage({ params }), {
    staleTime: 5_000,
  })
}