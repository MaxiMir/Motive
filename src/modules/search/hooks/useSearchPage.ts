import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { SearchPageDto } from '@dto'
import PageService from '@services/page'

export const useSearchPage = () => {
  const { asPath } = useRouter()

  return useQuery(asPath, () => PageService.get<SearchPageDto>(asPath), {
    staleTime: 5_000,
  })
}
