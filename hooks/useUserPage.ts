import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'
import { UserPageDto } from 'dto'
import PageService from 'services/PageService'

export default function useUserPage(fallbackData: UserPageDto): SWRResponse<UserPageDto> {
  const { asPath } = useRouter()

  return useSWR(asPath, () => PageService.getUser(asPath), { fallbackData })
}
