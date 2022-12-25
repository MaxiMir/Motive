import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { PageService } from '@features/page'
import { parseUrl } from '@helpers/url'

export const useUserPage = () => {
  const { asPath } = useRouter()
  const { origin, searchParams } = parseUrl(asPath)
  const nickname = origin.replace('/', '')

  return useQuery(nickname, () => PageService.getUser(nickname, { params: searchParams }), {
    staleTime: 5_000,
  })
}
