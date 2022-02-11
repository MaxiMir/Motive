import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { DayCharacteristicName, DayCharacteristicUpdate, GoalDto, UserBaseDto, UserPageDto } from 'dto'
import GoalService from 'services/GoalService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSnackbar from 'hooks/useSnackbar'
import { useUserPageConfig } from 'views/UserView/hook'
import { Context, getNextState } from './helper'

export default function useSetReaction(
  goal: GoalDto,
  name: DayCharacteristicName,
  active: boolean,
  client?: UserBaseDto,
): () => void {
  const { id, day } = goal
  const queryClient = useQueryClient()
  const { key } = useUserPageConfig()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, DayCharacteristicUpdate, Context>(GoalService.updateCharacteristic, {
    async onMutate(options: DayCharacteristicUpdate) {
      await queryClient.cancelQueries(key)
      const previous = queryClient.getQueryData<UserPageDto>(key)

      if (previous) {
        queryClient.setQueryData(key, getNextState(previous, options))
      }

      return { previous }
    },
    onSuccess(_, { add }) {
      add &&
        enqueueSnackbar({
          message: `You have increased goal's ${name} points`,
          severity: 'success',
          icon: 'magic',
        })
    },
    onError(_, __, context) {
      if (context?.previous) {
        queryClient.setQueryData(key, context?.previous)
      }
    },
  })
  const isAuthorized = !!client // todo check on auth

  const sendWithDebounce = useDebounceCb((add: boolean) => mutate({ id, dayId: day.id, name, add }))

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    sendWithDebounce(!active)
  }
}
