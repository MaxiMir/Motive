import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useUserPageCache } from 'entities/user'
import { useViewerAct } from 'entities/viewer'
import { UserPageDto, updateSubscription } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

interface Options {
  insert: boolean
}

export function useUpdateFollowing(userId: number, following: boolean) {
  const { formatMessage } = useIntl()
  const [page, mutatePage] = useUserPageCache()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ insert }: Options) => updateSubscription(userId, insert),
    {
      onSuccess(_, { insert }) {
        const operation = insert ? 'add' : 'remove'
        const message = formatMessage({ id: `page.user.following.message-${operation}` })
        mutatePage(getNextState(page, insert))
        enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
      },
    },
  )

  const onClick = useViewerAct(() => mutate({ insert: !following }))

  return [isLoading, onClick] as const
}

function getNextState(page: UserPageDto, following: boolean) {
  return produce(page, (draft) => {
    draft.following = following
    draft.characteristic.followers += following ? 1 : -1
  })
}
