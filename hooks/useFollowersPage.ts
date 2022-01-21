import useSWR, { SWRResponse } from 'swr'
import { SubscriptionPageDto } from 'dto'
import PageService from 'services/PageService'
import { useRouter } from 'next/router'

const SWR_KEY = 'FOLLOWERS'

export default function useFollowersPage(fallbackData: SubscriptionPageDto): SWRResponse<SubscriptionPageDto> {
  const router = useRouter()
  const nickname = (router.query?.id || '') as string

  return useSWR(SWR_KEY, () => PageService.getFollowers(nickname), { fallbackData })
}
