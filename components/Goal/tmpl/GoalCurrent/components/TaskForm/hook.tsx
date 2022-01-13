import { useRef } from 'react'
import dynamic from 'next/dynamic'
import produce from 'immer'
import { GoalDto } from 'dto'
import TaskService from 'services/TaskService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/User/hook'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(id: number, goalId: number, rest: number): () => void {
  const timerIdRef = useRef<NodeJS.Timeout>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()

  const { send } = useSend(TaskService.setCompleted, {
    onError() {
      mutateCompleted(false)
    },
  })

  function onUndo() {
    timerIdRef.current && clearTimeout(timerIdRef.current)
    mutateCompleted(false)
    closeSnackbar()
  }

  const mutateCompleted = (value: boolean) => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
        const [draftDay] = draftGoal.days
        const draftTask = draftDay.tasks[draftDay.tasks.findIndex((t) => t.id === id)]

        draftTask.completed = value
      }),
    )
  }

  return () => {
    const restWithNew = rest - 1

    mutateCompleted(true)
    enqueueSnackbar({
      message: !restWithNew ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${restWithNew}`,
      severity: 'success',
      icon: !restWithNew ? 'motivation-tech' : 'energy',
      action: <Button onClick={onUndo}>Undo</Button>,
    })
    timerIdRef.current = setTimeout(() => send({ id }), 4000)
  }
}
