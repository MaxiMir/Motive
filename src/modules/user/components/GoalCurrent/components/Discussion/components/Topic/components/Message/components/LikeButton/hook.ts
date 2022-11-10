import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { MessageDto, MessageType, TopicDto } from '@dto'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useSnackbar from '@hooks/useSnackbar'
import useDebounceCb from '@hooks/useDebounceCb'
import { useMutateGoals } from '@modules/user/hook'
import { Context, fetcher, getGoalNextState, getNextState, Options } from './helper'

export default function useSetLike(message: MessageDto, answerFor?: number): () => void {
  const { like, dayId, goalId } = message
  const key = ['discussion', dayId]
  const { formatMessage } = useIntl()
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
      const userMessageTmpl = formatMessage({ id: 'page.user.like-button.user-message' })
      const userMessage = userMessageTmpl.replace('$0', message.user.name)

      if (message.type === MessageType.Support) {
        enqueueSnackbar({
          message: userMessage,
          severity: 'success',
          icon: 'magic',
        })
      }

      const goalMessage = formatMessage({ id: 'page.user.like-button.goal-message' })

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