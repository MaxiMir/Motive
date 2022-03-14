import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { MessageDto, MessageType, TopicDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useSnackbar from 'hooks/useSnackbar'
import useDebounceCb from 'hooks/useDebounceCb'
import { useMutateGoals } from 'views/UserView/hook'
import { Context, fetcher, getGoalNextState, getNextState, Options } from './helper'

type SetLike = () => void

export default function useSetLike(message: MessageDto, answerFor: number | undefined): SetLike {
  const { like, dayId, goalId } = message
  const key = ['discussion', dayId]
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
      if (message.type === MessageType.SUPPORT) {
        enqueueSnackbar({
          message: `You have increased ${message.user.name} support points`,
          severity: 'success',
          icon: 'magic',
        })
      }

      if (answerFor) {
        mutateGoals(getGoalNextState(goals, goalId, add))
        enqueueSnackbar({
          message: "You have increased goal's support points",
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

  const mutateWithDebounce = useDebounceCb((value: boolean) => mutate({ message, answerFor, add: value }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutateWithDebounce(!like)
  }
}
