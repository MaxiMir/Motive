import useSWR, { SWRResponse } from 'swr'
import { UserPageDto } from 'dto'
import PageService from 'services/PageService'
import { usePageInfo } from 'views/User/hook'

export default function useUserPage(fallbackData: UserPageDto): SWRResponse<UserPageDto> {
  const { swrKey, nickname } = usePageInfo()

  return useSWR(swrKey, () => PageService.getUser(nickname), { fallbackData })
}
