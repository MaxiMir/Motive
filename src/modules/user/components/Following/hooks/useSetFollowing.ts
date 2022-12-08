import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { UserPageDto } from '@dto'
import { useUserContext } from '@modules/user/hooks'
import SubscriptionService from '@services/subscription'
import useSnackbar from '@hooks/useSnackbar'
import useDebounceCb from '@hooks/useDebounceCb'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useClient from '@hooks/useClient'

interface Options {
  add: boolean
}

const getNextState = (page: UserPageDto, add: boolean) =>
  produce(page, (draft) => {
    draft.following = add
    draft.characteristic.followers += add ? 1 : -1
  })

type UseSetFollowing = (userId: number, following: boolean) => () => void

export const useSetFollowing: UseSetFollowing = (userId, following) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(({ add }: Options) => SubscriptionService.update(userId, add), {
    async onMutate({ add }: Options) {
      await queryClient.cancelQueries(nickname)
      const previous = queryClient.getQueryData<UserPageDto>(nickname)

      if (previous) {
        queryClient.setQueryData(nickname, getNextState(previous, add))
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      const operation = add ? 'add' : 'remove'
      const message = formatMessage({ id: `page.user.following.message-${operation}` })
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(nickname, context?.previous)
      }
    },
  })
  const sendDebounce = useDebounceCb((add: boolean) => mutate({ add }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    sendDebounce(!following)
  }
}
