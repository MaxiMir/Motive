import { useRef } from 'react'
import produce from 'immer'
import { DayCharacteristicName, GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'

export default function useSetReaction(
  goal: GoalDto,
  name: DayCharacteristicName,
  active: boolean,
  clientId: number,
): () => void {
  const { id, days } = goal
  const lastLoadedRef = useRef(active)
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const isAuthorized = !!clientId // todo check on auth

  const { send } = useSend(GoalService.updateCharacteristic, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.add

      data.add &&
        enqueueSnackbar({
          message: `You have increased goal's ${name} points`,
          severity: 'success',
          icon: 'magic',
        })
    },
    onError(_, data) {
      mutateCharacteristic(!data.add)
    },
  })

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastLoadedRef.current !== add && send({ id, dayId: days[0].id, name, add })
  })

  const mutateCharacteristic = (add: boolean) => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === id)]
        const [draftDay] = draftGoal.days

        draftGoal.characteristic[name] += add ? 1 : -1
        draftDay.characteristic ||= { motivation: [], creativity: [] }

        if (add) {
          draftDay.characteristic[name].push(clientId)
          return
        }

        draftDay.characteristic[name] = draftDay.characteristic[name].filter((u) => u !== clientId)
      }),
    )
  }

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutateCharacteristic(!active)
    sendWithDebounce(!active)
  }
}
