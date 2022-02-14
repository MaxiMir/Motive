import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { UserPageDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useDebounceCb from 'hooks/useDebounceCb'
import { useUserPageConfig } from 'views/UserView/hook'
import { Options, Context, fetcher, getNextState } from './helper'

export default function useSetFollowing(id: number, following: boolean, isAuthorized: boolean): () => void {
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate({ add }: Options) {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<UserPageDto>(key)

      if (previous) {
        queryClient.setQueryData(key, getNextState(previous, add))
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      enqueueSnackbar({
        message: add ? 'Added following' : 'Removed following',
        severity: 'success',
        icon: 'speaker',
      })
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })
  const sendWithDebounce = useDebounceCb((add: boolean) => mutate({ id, add }))

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    sendWithDebounce(!following)
  }
}
