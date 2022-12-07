import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { DayCharacteristicName, DayCharacteristicUpdateDto, UserPageDto } from '@dto'
import useUserContext from '@features/user/hooks/useUserContext'
import useGoalContext from '@features/user/components/GoalCurrent/hooks/useGoalContext'
import GoalService from '@services/goal'
import useDebounceCb from '@hooks/useDebounceCb'
import useSnackbar from '@hooks/useSnackbar'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'

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

const useSetReaction = (name: DayCharacteristicName, active: boolean) => {
  const { formatMessage } = useIntl()
  const { id, day } = useGoalContext()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(GoalService.updateCharacteristic, {
    async onMutate(options: DayCharacteristicUpdateDto) {
      await queryClient.cancelQueries(nickname)
      const previous = queryClient.getQueryData<UserPageDto>(nickname)

      if (previous) {
        queryClient.setQueryData(nickname, getNextState(previous, options))
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
  const sendDebounce = useDebounceCb((add: boolean) => mutate({ id, dayId: day.id, name, add }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    sendDebounce(!active)
  }
}

export default useSetReaction
