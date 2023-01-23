import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useSnackbar } from '@modules/snackbar'
import { useMutateUserPage } from '@views/user/hooks'
import { UserPageDto } from '@modules/page'
import { SubscriptionService } from '@modules/subscription'
import { useOpenSignIn } from '@modules/signin'
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
  const [page, mutatePage] = useMutateUserPage()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ insert }: Options) => SubscriptionService.update(userId, insert),
    {
      onSuccess(_, { insert }) {
        const operation = insert ? 'add' : 'remove'
        const message = formatMessage({ id: `page.user.following.message-${operation}` })
        mutatePage(getNextState(page, insert))
        enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
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
