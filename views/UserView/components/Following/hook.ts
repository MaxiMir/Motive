import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { UserPageDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useDebounceCb from 'hooks/useDebounceCb'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import { useUserPageConfig } from 'views/UserView/hook'
import { Options, Context, fetcher, getNextState } from './helper'
import i18n from './i18n'

export default function useSetFollowing(userId: number, following: boolean, locale: Locale): () => void {
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
      const { getMessage } = i18n[locale]
      const message = getMessage(add)

      enqueueSnackbar({
        message,
        severity: 'success',
        icon: 'speaker',
      })
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })
  const sendWithDebounce = useDebounceCb((add: boolean) => mutate({ userId, add }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    sendWithDebounce(!following)
  }
}
