import useSWR, { SWRResponse } from 'swr'
import { FollowingPage, User } from 'dto'
import usePartialMutate from 'hooks/usePartialMutate'
import PageService from 'services/PageService'

const SWR_KEY = 'FOLLOWING'

type UseFollowingPage = [SWRResponse<FollowingPage>, (user: User[]) => void]

export default function useFollowingPage(fallbackData: FollowingPage): UseFollowingPage {
  const swr = useSWR(SWR_KEY, PageService.getFollowing, { fallbackData })
  const partialMutate = usePartialMutate(SWR_KEY)

  const mutate = (content: User[]) => {
    partialMutate({ ...swr.data, content }, false)
  }

  return [swr, mutate]
}
