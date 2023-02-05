import { Button } from '@mui/material'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { FollowingPageDto, UserDto, updateSubscription } from 'shared/api'
import { Route } from 'shared/config'
import { useSnackbar } from 'shared/ui/snackbar'

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

export const useRemoveFollowing = () => {
  const { formatMessage } = useIntl()
  const queryClient = useQueryClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ user, insert }: Options) => updateSubscription(user.id, insert),
    {
      async onMutate({ user, index, insert }) {
        await queryClient.cancelQueries(['page', Route.Following])
        const previous = queryClient.getQueryData<FollowingPageDto>(['page', Route.Following])

        if (previous) {
          queryClient.setQueryData(
            ['page', Route.Following],
            getNextState(previous, user, index, insert),
          )
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
            icon: '🗑',
            action: (
              <Button variant="text" sx={{ color: 'error.dark' }} onClick={onClick}>
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

  const remove = (user: UserDto, index: number) => {
    mutate({ user, index, insert: false })
  }

  return { isLoading, remove }
}