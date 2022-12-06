import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { Route } from '@href'
import { FollowingPageDto, UserDto } from '@dto'
import SubscriptionService from '@services/subscription'
import useSnackbar from '@hooks/useSnackbar'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useClient from '@hooks/useClient'

interface Options {
  user: UserDto
  index: number
  add: boolean
}

const getNextState = (page: FollowingPageDto, user: UserDto, index: number, add: boolean) =>
  produce(page, (draft) => {
    if (add) {
      draft.content.splice(index, 0, user)
      return
    }

    draft.content = draft.content.filter((u) => u.id !== user.id)
  })

const useRemoveFollowing = () => {
  const client = useClient()
  const { formatMessage } = useIntl()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const { mutate } = useMutation(({ user, add }: Options): Promise<void> => SubscriptionService.update(user.id, add), {
    async onMutate({ user, index, add }: Options) {
      await queryClient.cancelQueries(Route.Following)
      const previous = queryClient.getQueryData<FollowingPageDto>(Route.Following)

      if (previous) {
        queryClient.setQueryData(Route.Following, getNextState(previous, user, index, add))
      }

      return { previous }
    },
    onSuccess(_, { user, index, add }) {
      const undoText = formatMessage({ id: 'page.following.menu.undo' })
      const message = formatMessage({ id: 'page.following.menu.remove' })

      const onClick = () => onUndo(user, index)

      !add &&
        enqueueSnackbar({
          message,
          severity: 'success',
          action: (
            <Button variant="outlined" color="primary" onClick={onClick}>
              {undoText}
            </Button>
          ),
          icon: 'speaker',
        })
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData<FollowingPageDto>(Route.Following, context.previous)
      }
    },
  })

  function onUndo(user: UserDto, index: number) {
    closeSnackbar()
    mutate({ user, index, add: true })
  }

  return (user: UserDto, index: number) => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ user, index, add: false })
  }
}

export default useRemoveFollowing
