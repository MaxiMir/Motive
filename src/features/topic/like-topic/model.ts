import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useGoalsCache } from 'entities/user'
import { useViewerAct } from 'entities/viewer'
import { GoalDto, MessageDto, TopicDto, updateLike } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

interface Options {
  message: MessageDto
  parentId?: number
  add: boolean
}

export function useSetLike(message: MessageDto, parentId?: number) {
  const { id, like, dayId, goalId } = message
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
      if (message.type === 'support') {
        const userMessage = formatMessage(
          { id: 'page.user.like-button.user-message', defaultMessage: '' },
          { value: message.user.name },
        )

        enqueueSnackbar(userMessage, { severity: 'success', icon: '✨' })
      }

      if (parentId) {
        const goalMessage = formatMessage({ id: 'page.user.like-button.goal-message' })

        mutateGoals(getGoalNextState(goals, goalId, add))
        enqueueSnackbar(goalMessage, { severity: 'success', icon: '✨' })
      }
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })

  const onClick = useViewerAct(() => mutate({ message, parentId, add: !like }))

  return [isLoading, onClick] as const
}

function getTopicNextState(discussion: InfiniteData<TopicDto[]>, options: Options) {
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

function getGoalNextState(goals: GoalDto[], goalId: number, add: boolean): GoalDto[] {
  return produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.points += add ? 1 : -1
  })
}
