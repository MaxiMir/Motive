import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { PageService } from '@features/page'
import { Route } from '@href'

export const useSearchPage = () => {
  const { query: params } = useRouter()

  return useQuery(['page', Route.Search], () => PageService.getSearch({ params }), {
    staleTime: 5_000,
  })
}
