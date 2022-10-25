import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { DayCharacteristicName, DayCharacteristicUpdateDto, GoalDto, UserPageDto } from 'src/common/dto'
import { GoalService } from 'src/common/services/goal'
import useDebounceCb from 'src/common/hooks/useDebounceCb'
import useSnackbar from 'src/common/hooks/useSnackbar'
import useClient from 'src/common/hooks/useClient'
import useOpenSignIn from 'src/common/hooks/useOpenSignIn'
import { useUserPageConfig } from '@modules/user'
import { Context, getNextState } from './helper'
import i18n from './i18n'

type SetReaction = () => void

export default function useSetReaction(goal: GoalDto, name: DayCharacteristicName, active: boolean): SetReaction {
  const { id, day } = goal
  const { locale } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, DayCharacteristicUpdateDto, Context>(
    GoalService.updateCharacteristic,
    {
      async onMutate(options: DayCharacteristicUpdateDto) {
        await queryClient.cancelQueries(key)
        const previous = queryClient.getQueryData<UserPageDto>(key)

        if (previous) {
          queryClient.setQueryData(key, getNextState(previous, options))
        }

        return { previous }
      },
      onSuccess(_, { add }) {
        const { getMessage } = i18n[locale]
        const message = getMessage(name)

        add && enqueueSnackbar({ message, severity: 'success', icon: 'magic' })
      },
      onError(_, _1, context) {
        if (context?.previous) {
          queryClient.setQueryData(key, context?.previous)
        }
      },
    },
  )
  const sendDebounce = useDebounceCb((add: boolean) => mutate({ id, dayId: day.id, name, add }))

  return () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    sendDebounce(!active)
  }
}
