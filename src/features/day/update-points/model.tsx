import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useUserContext } from 'entities/user'
import { useViewer, useSignIn } from 'entities/viewer'
import { DayPointsUpdateDto, UserPageDto, updatePoints } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useUpdatePoints(goalId: number, dayId: number, active: boolean) {
  const { formatMessage } = useIntl()
  const viewer = useViewer()
  const openSignIn = useSignIn((state) => state.openSignIn)
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(updatePoints, {
    async onMutate(options) {
      await queryClient.cancelQueries(['page', nickname])
      const previous = queryClient.getQueryData<UserPageDto>(['page', nickname])

      if (previous) {
        queryClient.setQueryData(['page', nickname], getNextState(previous, options))
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      if (!add) return

      const message = formatMessage({ id: 'page.user.topic.message' })
      enqueueSnackbar(message, { severity: 'success', icon: '✨' })
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(['page', nickname], context?.previous)
      }
    },
  })

  const onClick = () => {
    if (!viewer) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ id: goalId, dayId, add: !active })
  }

  return { isLoading, onClick }
}

function getNextState(page: UserPageDto, { id, dayId, add }: DayPointsUpdateDto) {
  return produce(page, (draft) => {
    const draftGoals = draft.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === id)]
    draftGoal.points += add ? 1 : -1
    draftGoal.day.points += add ? 1 : -1
    draftGoal.day.pointsRated += add ? 1 : -1
    draftGoal.viewerPoints = add
      ? [...draftGoal.viewerPoints, dayId]
      : draftGoal.viewerPoints.filter((r) => r !== dayId)
  })
}
