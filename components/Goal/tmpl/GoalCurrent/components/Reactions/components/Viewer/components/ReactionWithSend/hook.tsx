import { useRef } from 'react'
import produce from 'immer'
import { DayCharacteristicName, GoalDto, UserBaseDto } from 'dto'
import GoalService from 'services/GoalService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/UserView/hook'

export default function useSetReaction(
  goal: GoalDto,
  name: DayCharacteristicName,
  active: boolean,
  client?: UserBaseDto,
): () => void {
  const { id, day } = goal
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
  const isAuthorized = !!client // todo check on auth

  const sendWithDebounce = useDebounceCb((add: boolean) => {
    lastAddRef.current !== add && send({ id, dayId: day.id, name, add })
  })

  const mutateCharacteristic = (add: boolean) => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === id)]
        draftGoal.characteristic[name] += add ? 1 : -1
        draftGoal.reactions[name] = add
          ? [...draftGoal.reactions[name], day.id]
          : draftGoal.reactions[name].filter((r) => r !== day.id)
      }),
    )
  }

  const rollbackCharacteristic = () => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === id)]
        draftGoal.characteristic = backupRef.current.characteristic
        draftGoal.day = backupRef.current.day
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
