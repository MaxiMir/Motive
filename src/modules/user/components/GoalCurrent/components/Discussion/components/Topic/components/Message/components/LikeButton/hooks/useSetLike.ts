import produce from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { GoalDto, MessageDto, MessageType, TopicDto } from '@dto'
import TopicService from '@services/topic'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useSnackbar from '@hooks/useSnackbar'
import useDebounceCb from '@hooks/useDebounceCb'
import useMutateGoals from '@user-hooks/useMutateGoals'

export interface Options {
  message: MessageDto
  answerFor?: number
  add: boolean
}

const getNextState = (discussion: InfiniteData<TopicDto[]>, options: Options): InfiniteData<TopicDto[]> => {
  const { message, answerFor, add } = options
  const searchId = answerFor || message.id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) return

    if (answerFor && draftTopic.answer) {
      draftTopic.answer.like = add
      draftTopic.answer.likeCount += add ? 1 : -1
      return
    }

    draftTopic.like = add
    draftTopic.likeCount += add ? 1 : -1
  })
}

const getGoalNextState = (goals: GoalDto[], goalId: number, add: boolean): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.characteristic.support += add ? 1 : -1
  })

function useSetLike(message: MessageDto, answerFor?: number): () => void {
  const { id, like, dayId, goalId } = message
  const key = ['discussion', dayId]
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [goals, mutateGoals] = useMutateGoals()
  const queryClient = useQueryClient()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(({ add }: Options) => TopicService.updateLike(id, add), {
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

export default useSetLike