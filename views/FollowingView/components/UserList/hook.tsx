import produce from 'immer'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from '@material-ui/core'
import { SubscriptionPageDto, UserDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import { QUERY_KEY } from 'views/FollowingView/hook'
import { Options, Context, fetcher } from './helper'

export default function useRemoveFollowing(isAuthorized: boolean): (user: UserDto, index: number) => void {
  const queryClient = useQueryClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate({ user, index, add }: Options) {
      await queryClient.cancelQueries(QUERY_KEY)
      const previous = queryClient.getQueryData<SubscriptionPageDto>(QUERY_KEY)

      if (previous) {
        const next = produce(previous, (draft) => {
          if (add) {
            draft.content.splice(index, 0, user)
            return
          }

          draft.content = draft.content.filter((u) => u.id !== user.id)
        })
        queryClient.setQueryData<SubscriptionPageDto>(QUERY_KEY, next)
      }

      return { previous }
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData<SubscriptionPageDto>(QUERY_KEY, context.previous)
      }

      enqueueSnackbar({ severity: 'error' })
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
  })

  function onUndo(user: UserDto, index: number) {
    closeSnackbar()
    mutate({ user, index, add: true })
  }

  return (user: UserDto, index: number) => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutate({ user, index, add: false })
  }
}
