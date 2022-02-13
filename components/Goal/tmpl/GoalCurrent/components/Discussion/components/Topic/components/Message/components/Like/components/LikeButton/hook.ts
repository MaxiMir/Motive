import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { MessageDto, TopicDto } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import { Options, Context, fetcher, getNextState } from './helper'

export default function useSetLike(
  dayID: number,
  message: MessageDto,
  answerFor: number | undefined,
  isAuthorized: boolean,
): () => void {
  const key = ['discussion', dayID]
  const { like } = message
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
