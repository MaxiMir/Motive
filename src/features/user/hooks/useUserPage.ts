import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { PageService } from '@features/page'
import { parseUrl } from '@helpers/url'

const useUserPage = () => {
  const { asPath } = useRouter()
  const { base, searchParams } = parseUrl(asPath)
  const nickname = base.replace('/', '')

  return useQuery(nickname, () => PageService.getUser(nickname, { params: searchParams }), {
    staleTime: 5_000,
  })
}

export default useUserPage
