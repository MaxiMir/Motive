import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { MessageDto, MessageType, TopicDto } from 'src/common/dto'
import useClient from 'src/common/hooks/useClient'
import useOpenSignIn from 'src/common/hooks/useOpenSignIn'
import useSnackbar from 'src/common/hooks/useSnackbar'
import useDebounceCb from 'src/common/hooks/useDebounceCb'
import { useMutateGoals } from '@modules/user'
import { Context, fetcher, getGoalNextState, getNextState, Options } from './helper'
import i18n from './i18n'

type SetLike = () => void

export default function useSetLike(message: MessageDto, answerFor: number | undefined): SetLike {
  const { like, dayId, goalId } = message
  const key = ['discussion', dayId]
  const { locale } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [goals, mutateGoals] = useMutateGoals()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, Options, Context>(fetcher, {
    async onMutate(options: Options) {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<InfiniteData<TopicDto[]>>(key)

      if (previous) {
        queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
          key,
          (prev) => prev && getNextState(prev, options),
        )
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      const { goalMessage, getUserMessage } = i18n[locale]

      if (message.type === MessageType.Support) {
        enqueueSnackbar({
          message: getUserMessage(message.user.name),
          severity: 'success',
          icon: 'magic',
        })
      }

      if (answerFor) {
        mutateGoals(getGoalNextState(goals, goalId, add))
        enqueueSnackbar({
          message: goalMessage,
          severity: 'success',
          icon: 'magic',
        })
      }
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })

  const mutateDebounce = useDebounceCb((value: boolean) => mutate({ message, answerFor, add: value }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutateDebounce(!like)
  }
}
