import produce from 'immer'
import { useIntl } from 'react-intl'
import { useMutation, useQueryClient } from 'react-query'
import { useOpenSignIn } from 'entities/signin'
import { useUserContext, useClient } from 'entities/user'
import {
  DayCharacteristicName,
  DayCharacteristicUpdateDto,
  UserPageDto,
  updateCharacteristic,
} from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

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
  goalId: number,
  dayId: number,
  name: DayCharacteristicName,
  active: boolean,
) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { nickname } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, mutate } = useMutation(updateCharacteristic, {
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

      const nameText = formatMessage({ id: `page.user.topic.${name}` })
      const message = formatMessage(
        { id: 'page.user.topic.message', defaultMessage: '' },
        { value: nameText },
      )
      enqueueSnackbar({ message, severity: 'success', icon: '✨' })
    },
    onError(_, _1, context) {
      if (context?.previous) {
        queryClient.setQueryData(['page', nickname], context?.previous)
      }
    },
  })

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ id: goalId, dayId, name, add: !active })
  }

  return [isLoading, onClick] as const
}
