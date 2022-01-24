import useSWR from 'swr'
import { SubscriptionPageDto, UserDto } from 'dto'
import PageService from 'services/PageService'

const SWR_KEY = 'FOLLOWING'

type UseFollowingPage = { data?: SubscriptionPageDto; error: Error; mutateUsers: (user: UserDto[]) => void }

export default function useFollowingPage(fallbackData: SubscriptionPageDto): UseFollowingPage {
  const { data, error, mutate } = useSWR(SWR_KEY, PageService.getFollowing, { fallbackData })

  const mutateUsers = (content: UserDto[]) => mutate({ ...data, content }, false)

  return { data, error, mutateUsers }
}
