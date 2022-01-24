import useSWR, { SWRResponse } from 'swr'
import { SubscriptionPageDto, UserDto } from 'dto'
import PageService from 'services/PageService'
import usePartialMutate from 'hooks/usePartialMutate'

const SWR_KEY = 'FOLLOWING'

type UseFollowingPage = [SWRResponse<SubscriptionPageDto>, (user: UserDto[]) => void]

export default function useFollowingPage(fallbackData: SubscriptionPageDto): UseFollowingPage {
  const swr = useSWR(SWR_KEY, PageService.getFollowing, { fallbackData })
  const partialMutate = usePartialMutate(SWR_KEY)

  const mutate = (content: UserDto[]) => {
    partialMutate({ ...swr.data, content }, false)
  }

  return [swr, mutate]
}
