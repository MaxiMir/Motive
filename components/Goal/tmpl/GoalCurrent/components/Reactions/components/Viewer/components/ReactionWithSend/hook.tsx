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
  const lastAddRef = useRef(active)
  const backupRef = useRef(goal)
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { send } = useSend(GoalService.updateCharacteristic, {
    onSuccess(_, request) {
      lastAddRef.current = request.add

      request.add &&
        enqueueSnackbar({
          message: `You have increased goal's ${name} points`,
          severity: 'success',
          icon: 'magic',
        })
    },
    onError() {
      rollbackCharacteristic()
    },
  })
  const isAuthorized = !!clientId // todo check on auth

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastAddRef.current !== add && send({ id, dayId: days[0].id, name, add })
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

  const rollbackCharacteristic = () => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === id)]
        draftGoal.characteristic = backupRef.current.characteristic
        draftGoal.days = backupRef.current.days
      }),
    )
  }

  return () => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    backupRef.current = goal
    mutateCharacteristic(!active)
    sendWithDebounce(!active)
  }
}
