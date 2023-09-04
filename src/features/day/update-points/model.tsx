import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext } from 'entities/user'
import { useViewer, useViewerAct } from 'entities/viewer'
import { UserPageDto, updatePoints } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

interface Options {
  insert: boolean
}

export function useUpdatePoints(goalId: number, dayId: number, active: boolean) {
  const { formatMessage } = useIntl()
  const viewer = useViewer()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(
    ({ insert }: Options) => updatePoints(goalId, dayId, insert),
    {
      async onMutate({ insert }) {
        await queryClient.cancelQueries(['page', nickname])
        const previous = queryClient.getQueryData<UserPageDto>(['page', nickname])

        if (previous && viewer) {
          queryClient.setQueryData(
            ['page', nickname],
            produce(previous, (draft) => {
              const draftGoals = draft.goals
              const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goalId)]
              draftGoal.points += insert ? 1 : -1
              draftGoal.day.points += insert ? 1 : -1
              draftGoal.day.pointsRated += insert ? 1 : -1
              draftGoal.day.lastRated ??= []
              draftGoal.day.lastRated = insert
                ? [viewer, ...draftGoal.day.lastRated]
                : draftGoal.day.lastRated.filter((r) => r.id !== viewer?.id)
              draftGoal.viewerPoints = insert
                ? [...draftGoal.viewerPoints, dayId]
                : draftGoal.viewerPoints.filter((r) => r !== dayId)
            }),
          )
        }

        return { previous }
      },
      onSuccess(_, { insert }) {
        if (!insert) return

        const message = formatMessage({ id: 'page.user.topic.message' })
        enqueueSnackbar(message, { severity: 'success', icon: '✨' })
      },
      onError(_, _1, context) {
        if (context?.previous) {
          queryClient.setQueryData(['page', nickname], context?.previous)
        }
      },
    },
  )

  const onClick = useViewerAct(() => mutate({ insert: !active }))

  return { isLoading, onClick }
}
