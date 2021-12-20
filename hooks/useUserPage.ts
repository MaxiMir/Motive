import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'
import { UserPage } from 'dto'
import PageService from 'services/PageService'

export default function useUserPage(fallbackData: UserPage): SWRResponse<UserPage> {
  const { asPath } = useRouter()

  return useSWR(asPath, () => PageService.getUser(asPath), { fallbackData })
}
