import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from '@material-ui/core'
import { SubscriptionPageDto, UserDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useSignInModal from 'hooks/useSignInModal'
import useClient from 'hooks/useClient'
import { QUERY_KEY } from 'views/FollowingView/hook'
import { Options, Context, fetcher, getNextState } from './helper'

export default function useRemoveFollowing(): (user: UserDto, index: number) => void {
  const client = useClient()
  const signIn = useSignInModal()
  const queryClient = useQueryClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate({ user, index, add }: Options) {
      await queryClient.cancelQueries(QUERY_KEY)
      const previous = queryClient.getQueryData<SubscriptionPageDto>(QUERY_KEY)

      if (previous) {
        queryClient.setQueryData(QUERY_KEY, getNextState(previous, user, index, add))
      }

      return { previous }
    },
    onSuccess(_, { user, index, add }) {
      !add &&
        enqueueSnackbar({
          message: 'Removed from following',
          severity: 'success',
          action: <Button onClick={() => onUndo(user, index)}>Undo</Button>,
          icon: 'speaker',
        })
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData<SubscriptionPageDto>(QUERY_KEY, context.previous)
      }
    },
  })

  function onUndo(user: UserDto, index: number) {
    closeSnackbar()
    mutate({ user, index, add: true })
  }

  return (user: UserDto, index: number) => {
    if (!client) {
      signIn()
      return
    }

    mutate({ user, index, add: false })
  }
}
