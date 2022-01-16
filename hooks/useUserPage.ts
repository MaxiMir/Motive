import useSWR, { SWRResponse } from 'swr'
import { UserPageDto } from 'dto'
import { usePageSWRConfig } from 'views/User/hook'
import PageService from 'services/PageService'

export default function useUserPage(fallbackData: UserPageDto): SWRResponse<UserPageDto> {
  const { key, urn } = usePageSWRConfig()

  return useSWR(
    key,
    () => PageService.getUser(typeof window === 'undefined' ? urn : window.location.pathname + window.location.search),
    { fallbackData },
  )
}
