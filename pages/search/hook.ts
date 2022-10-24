import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { SearchPageDto } from 'dto'
import PageService from 'services/PageService'

export default function useSearchPage(): UseQueryResult<SearchPageDto> {
  const { asPath } = useRouter()

  return useQuery(asPath, () => PageService.get(asPath), {
    staleTime: 5_000,
  })
}
