import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { PageService } from '@features/page'

export const useSearchPage = () => {
  const { asPath, query: params } = useRouter()

  return useQuery(asPath, () => PageService.getSearch({ params }), {
    staleTime: 5_000,
  })
}
