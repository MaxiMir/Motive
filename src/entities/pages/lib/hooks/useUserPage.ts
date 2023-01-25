import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { parseUrl } from '@shared/lib/helpers/url'
import { getUserPage } from '@entities/pages/api/getUserPage'

export const useUserPage = () => {
  const { asPath } = useRouter()
  const { origin, searchParams } = parseUrl(asPath)
  const nickname = origin.replace('/', '')

  return useQuery(['page', nickname], () => getUserPage(nickname, { params: searchParams }), {
    staleTime: 5_000,
  })
}
