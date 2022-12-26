import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext } from '@modules/user/hooks'
import { UserPageDto } from '@features/page'
import { SubscriptionService } from '@features/subscription'
import useSnackbar from '@hooks/useSnackbar'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useClient from '@hooks/useClient'

const getNextState = (page: UserPageDto, following: boolean) =>
  produce(page, (draft) => {
    draft.following = following
    draft.characteristic.followers += following ? 1 : -1
  })

interface Options {
  insert: boolean
}

export const useSetFollowing = (userId: number, following: boolean): [boolean, () => void] => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const [enqueueSnackbar] = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ insert }: Options) => SubscriptionService.update(userId, insert),
    {
      async onMutate({ insert }: Options) {
        await queryClient.cancelQueries(nickname)
        const previous = queryClient.getQueryData<UserPageDto>(nickname)

        if (previous) {
          queryClient.setQueryData(nickname, getNextState(previous, insert))
        }

        return { previous }
      },
      onSuccess(_, { insert }) {
        const operation = insert ? 'add' : 'remove'
        const message = formatMessage({ id: `page.user.following.message-${operation}` })
        enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
      },
      onError(_, _1, context) {
        if (context?.previous) {
          queryClient.setQueryData(nickname, context?.previous)
        }
      },
    },
  )

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ insert: !following })
  }

  return [isLoading, onClick]
}
