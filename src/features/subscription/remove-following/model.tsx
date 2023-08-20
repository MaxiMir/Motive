import { Button } from '@mui/material'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { FollowingPageDto, UserDto, updateSubscription } from 'shared/api'
import { Route } from 'shared/config'
import { useSnackbar } from 'shared/ui/snackbar'

interface Options {
  dto: UserDto
  index: number
  insert: boolean
}

export function useRemoveFollowing() {
  const { formatMessage } = useIntl()
  const queryClient = useQueryClient()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ dto, insert }: Options) => updateSubscription(dto.id, insert),
    {
      async onMutate({ dto, index, insert }) {
        await queryClient.cancelQueries(['page', Route.Following])
        const previous = queryClient.getQueryData<FollowingPageDto>(['page', Route.Following])

        if (previous) {
          queryClient.setQueryData(
            ['page', Route.Following],
            getNextState(previous, dto, index, insert),
          )
        }

        return { previous }
      },
      onSuccess(_, { dto, index, insert }) {
        const undoText = formatMessage({ id: 'page.following.menu.undo' })
        const message = formatMessage({ id: 'page.following.menu.remove' })

        const onClick = () => onUndo(dto, index)

        !insert &&
          enqueueSnackbar(message, {
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

  function onUndo(dto: UserDto, index: number) {
    closeSnackbar()
    mutate({ dto, index, insert: true })
  }

  const remove = (dto: UserDto, index: number) => {
    mutate({ dto, index, insert: false })
  }

  return { isLoading, remove }
}

function getNextState(page: FollowingPageDto, user: UserDto, index: number, add: boolean) {
  return produce(page, (draft) => {
    if (add) {
      draft.following.splice(index, 0, user)
      return
    }

    draft.following.splice(index, 1)
  })
}
