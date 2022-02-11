import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { UserPageDto } from 'dto'
import DiscussionService from 'services/DiscussionService'
import useDebounceCb from 'hooks/useDebounceCb'
import { useUserPageConfig } from 'views/UserView/hook'
import { Context } from './helper'

export default function useSetReaction(id: number, isAuthorized: boolean): () => void {
  const active = false // TODO change
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const { mutate } = useMutation<void, AxiosError, { id: number; like: boolean }, Context>(DiscussionService.setLike, {
    async onMutate() {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<UserPageDto>(key)

      return { previous }
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })

  const mutateWithDebounce = useDebounceCb((value: boolean) => mutate({ id, like: value }))

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutateWithDebounce(!active)
  }
}
