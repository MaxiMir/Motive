import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from '@mui/material'
import { SubscriptionPageDto, UserDto } from 'dto'
import { FOLLOWING } from 'route'
import { Locale } from 'hooks/useLocale'
import useSnackbar from 'hooks/useSnackbar'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useClient from 'hooks/useClient'
import { Options, Context, fetcher, getNextState } from './helper'
import i18n from './i18n'

export default function useRemoveFollowing(locale: Locale): (user: UserDto, index: number) => void {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate({ user, index, add }: Options) {
      await queryClient.cancelQueries(FOLLOWING)
      const previous = queryClient.getQueryData<SubscriptionPageDto>(FOLLOWING)

      if (previous) {
        queryClient.setQueryData(FOLLOWING, getNextState(previous, user, index, add))
      }

      return { previous }
    },
    onSuccess(_, { user, index, add }) {
      const { message, undo } = i18n[locale]

      !add &&
        enqueueSnackbar({
          message,
          severity: 'success',
          action: (
            <Button variant="outlined" color="primary" onClick={() => onUndo(user, index)}>
              {undo}
            </Button>
          ),
          icon: 'speaker',
        })
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData<SubscriptionPageDto>(FOLLOWING, context.previous)
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
