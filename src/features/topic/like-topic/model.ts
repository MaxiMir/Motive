import produce from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useOpenSignIn } from 'entities/signin'
import { useGoalsCache, useClient } from 'entities/user'
import { GoalDto, MessageDto, TopicType, TopicDto, updateLike } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export interface Options {
  message: MessageDto
  parentId?: number
  add: boolean
}

const getTopicNextState = (discussion: InfiniteData<TopicDto[]>, options: Options) => {
  const { message, parentId, add } = options
  const searchId = parentId || message.id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) return

    if (parentId && draftTopic.answer) {
      draftTopic.answer.like = add
      draftTopic.answer.likeCount += add ? 1 : -1
      return
    }

    draftTopic.like = add
    draftTopic.likeCount += add ? 1 : -1
  })
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, add: boolean): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.characteristic.support += add ? 1 : -1
  })

export const useSetLike = (message: MessageDto, parentId?: number) => {
  const { id, like, dayId, goalId } = message
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [goals, mutateGoals] = useGoalsCache()
  const queryClient = useQueryClient()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const key = ['discussion', dayId]
  const { isLoading, mutate } = useMutation(({ add }: Options) => updateLike(id, add), {
    async onMutate(options: Options) {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<InfiniteData<TopicDto[]>>(key)

      if (previous) {
        queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
          key,
          (prev) => prev && getTopicNextState(prev, options),
        )
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      const userMessage = formatMessage(
        { id: 'page.user.like-button.user-message', defaultMessage: '' },
        { value: message.user.name },
      )

      if (message.type === TopicType.Support) {
        enqueueSnackbar({ message: userMessage, severity: 'success', icon: '✨' })
      }

      const goalMessage = formatMessage({ id: 'page.user.like-button.goal-message' })

      if (parentId) {
        mutateGoals(getGoalNextState(goals, goalId, add))
        enqueueSnackbar({ message: goalMessage, severity: 'success', icon: '✨' })
      }
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ message, parentId, add: !like })
  }

  return [isLoading, onClick] as const
}
