import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getUserPage } from 'shared/api'
import { parseUrl } from 'shared/lib/helpers'

export function useUserPage() {
  const { asPath } = useRouter()
  const { origin, searchParams } = parseUrl(asPath)
  const nickname = origin.replace('/', '')

  return useQuery(['page', nickname], () => getUserPage(nickname, { params: searchParams }), {
    staleTime: 5_000,
  })
}
