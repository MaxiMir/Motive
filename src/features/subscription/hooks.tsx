import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { useSnackbar } from '@features/snackbar'
import { Button } from '@mui/material'
import { Route } from '@href'
import { FollowingPageDto } from '@features/page'
import { UserDto } from '@features/user'
import { SubscriptionService } from '@features/subscription/service'
import { useOpenSignIn } from '@features/signin'
import useClient from '@hooks/useClient'

interface Options {
  user: UserDto
  index: number
  insert: boolean
}

const getNextState = (page: FollowingPageDto, user: UserDto, index: number, add: boolean) =>
  produce(page, (draft) => {
    if (add) {
      draft.following.splice(index, 0, user)
      return
    }

    draft.following.splice(index, 1)
  })

export const useRemoveFollowing = (): [boolean, (user: UserDto, index: number) => void] => {
  const client = useClient()
  const { formatMessage } = useIntl()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ user, insert }: Options) => SubscriptionService.update(user.id, insert),
    {
      async onMutate({ user, index, insert }) {
        await queryClient.cancelQueries(Route.Following)
        const previous = queryClient.getQueryData<FollowingPageDto>(Route.Following)

        if (previous) {
          queryClient.setQueryData(Route.Following, getNextState(previous, user, index, insert))
        }

        return { previous }
      },
      onSuccess(_, { user, index, insert }) {
        const undoText = formatMessage({ id: 'page.following.menu.undo' })
        const message = formatMessage({ id: 'page.following.menu.remove' })

        const onClick = () => onUndo(user, index)

        !insert &&
          enqueueSnackbar({
            message,
            severity: 'success',
            action: (
              <Button variant="outlined" color="primary" onClick={onClick}>
                {undoText}
              </Button>
            ),
          })
      },
      onError(_, _1, context) {
        if (context?.previous) {
          queryClient.setQueryData<FollowingPageDto>(Route.Following, context.previous)
        }
      },
    },
  )

  function onUndo(user: UserDto, index: number) {
    closeSnackbar()
    mutate({ user, index, insert: true })
  }

  const removeFollowing = (user: UserDto, index: number) => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ user, index, insert: false })
  }

  return [isLoading, removeFollowing]
}
