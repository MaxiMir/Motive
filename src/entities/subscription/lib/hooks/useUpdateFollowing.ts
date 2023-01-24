import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useSnackbar } from '@entities/snackbar'
import { useMutateUserPage } from '@pages/user/hooks'
import { UserPageDto } from '@entities/user'
import { updateSubscription } from '@entities/subscription/api/updateSubscription'
import { useOpenSignIn } from '@entities/signin'
import useClient from '@hooks/useClient'

const getNextState = (page: UserPageDto, following: boolean) =>
  produce(page, (draft) => {
    draft.following = following
    draft.characteristic.followers += following ? 1 : -1
  })

interface Options {
  insert: boolean
}

export const useUpdateFollowing = (userId: number, following: boolean): [boolean, () => void] => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [page, mutatePage] = useMutateUserPage()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ insert }: Options) => updateSubscription(userId, insert),
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
