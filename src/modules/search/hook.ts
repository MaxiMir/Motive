import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { SearchPageDto } from 'src/common/dto'
import { PageService } from 'src/common/services/page'

export function useSearchPage(): UseQueryResult<SearchPageDto> {
  const { asPath } = useRouter()

  return useQuery(asPath, () => PageService.get(asPath), {
    staleTime: 5_000,
  })
}
