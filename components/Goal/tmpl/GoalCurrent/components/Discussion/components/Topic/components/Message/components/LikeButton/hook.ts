import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { MessageDto, MessageType, TopicDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useSnackbar from 'hooks/useSnackbar'
import useDebounceCb from 'hooks/useDebounceCb'
import useLocale from 'hooks/useLocale'
import { useMutateGoals } from 'views/UserView/hook'
import { Context, fetcher, getGoalNextState, getNextState, Options } from './helper'
import i18n from './i18n'

type SetLike = () => void

export default function useSetLike(message: MessageDto, answerFor: number | undefined): SetLike {
  const { like, dayId, goalId } = message
  const key = ['discussion', dayId]
  const client = useClient()
  const { locale } = useLocale()
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

      if (message.type === MessageType.SUPPORT) {
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
    onError(_, __, context) {
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
