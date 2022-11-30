import produce from 'immer'
import { AxiosError } from 'axios'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { UserPageDto } from '@dto'
import SubscriptionService from '@services/subscription'
import useSnackbar from '@hooks/useSnackbar'
import useDebounceCb from '@hooks/useDebounceCb'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useClient from '@hooks/useClient'
import useUserPageConfig from '@user-hooks/useUserPageConfig'

interface Options {
  userId: number
  add: boolean
}

interface Context {
  previous?: UserPageDto
}

const fetcher = ({ userId, add }: Options): Promise<void> => SubscriptionService.update(userId, add)

const getNextState = (page: UserPageDto, add: boolean) =>
  produce(page, (draft) => {
    draft.content.following = add
    draft.content.characteristic.followers += add ? 1 : -1
  })

function useSetFollowing(userId: number, following: boolean): () => void {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate({ add }: Options) {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<UserPageDto>(key)

      if (previous) {
        queryClient.setQueryData(key, getNextState(previous, add))
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
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })
  const sendDebounce = useDebounceCb((add: boolean) => mutate({ userId, add }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    sendDebounce(!following)
  }
}

export default useSetFollowing
