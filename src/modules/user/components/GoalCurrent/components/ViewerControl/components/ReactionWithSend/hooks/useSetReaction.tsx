import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { useUserContext } from '@modules/user/hooks'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { UserPageDto } from '@features/page'
import { GoalService } from '@features/goal'
import { DayCharacteristicName, DayCharacteristicUpdateDto } from '@features/day'
import { useOpenSignIn } from '@features/signin'
import { useSnackbar } from '@features/snackbar'
import useClient from '@hooks/useClient'

const getNextState = (page: UserPageDto, { id, dayId, add, name }: DayCharacteristicUpdateDto) =>
  produce(page, (draft) => {
    const draftGoals = draft.goals
    const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === id)]
    draftGoal.characteristic[name] += add ? 1 : -1

    if (!draftGoal.day.characteristic) {
      draftGoal.day.characteristic = { motivation: 0, creativity: 0 }
    }

    draftGoal.day.characteristic[name] += add ? 1 : -1
    draftGoal.reactions[name] = add
      ? [...draftGoal.reactions[name], dayId]
      : draftGoal.reactions[name].filter((r) => r !== dayId)
  })

export const useSetReaction = (
  name: DayCharacteristicName,
  active: boolean,
): [boolean, () => void] => {
  const { formatMessage } = useIntl()
  const { id, day } = useGoalContext()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const [enqueueSnackbar] = useSnackbar()
  const { isLoading, mutate } = useMutation(GoalService.updateCharacteristic, {
    async onMutate(options) {
      await queryClient.cancelQueries(['page', nickname])
      const previous = queryClient.getQueryData<UserPageDto>(['page', nickname])

      if (previous) {
        queryClient.setQueryData(['page', nickname], getNextState(previous, options))
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      const nameText = formatMessage({ id: `page.user.topic.${name}` })
      const messageTmpl = formatMessage({ id: 'page.user.topic.message' })
      const message = messageTmpl.replace('$0', nameText)
      add && enqueueSnackbar({ message, severity: 'success', icon: 'magic' })
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(nickname, context?.previous)
      }
    },
  })

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ id, dayId: day.id, name, add: !active })
  }

  return [isLoading, onClick]
}
