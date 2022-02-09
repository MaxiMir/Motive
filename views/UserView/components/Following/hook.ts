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
      const previous = queryClient.getQueryData<UserPageDto>(key)

      if (previous) {
        queryClient.setQueryData(key, getNextState(previous, add))
      }

      return { previous }
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }

      enqueueSnackbar({ severity: 'error' })
    },
    onSuccess(_, { add }) {
      enqueueSnackbar({
        message: add ? 'Added following' : 'Removed following',
        severity: 'success',
        icon: 'speaker',
      })
    },
  })

  return useDebounceCb<void>(() => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutate({ id, add: !following })
  }, 500)
}
