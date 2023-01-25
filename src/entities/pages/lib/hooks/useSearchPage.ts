import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getSearchPage } from '@entities/pages/api/getSearchPage'
import { Route } from '@shared/consts/routes'

export const useSearchPage = () => {
  const { query: params } = useRouter()

  return useQuery(['page', Route.Search], () => getSearchPage({ params }), {
    staleTime: 5_000,
  })
}
