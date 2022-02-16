import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { MessageDto, TopicDto } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import { useMutateGoals } from 'views/UserView/hook'
import { Options, Context, fetcher, getNextState, getGoalNextState } from './helper'

type SetLike = () => void

export default function useSetLike(message: MessageDto, answerFor: number | undefined, isAuthorized: boolean): SetLike {
  const { like, dayId, goalId } = message
  const key = ['discussion', dayId]
  const [goals, mutateGoals] = useMutateGoals()
  const queryClient = useQueryClient()
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
      if (answerFor) {
        mutateGoals(getGoalNextState(goals, goalId, add))
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
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutateWithDebounce(!like)
  }
}
