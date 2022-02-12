import { useRef } from 'react'
import dynamic from 'next/dynamic'
import produce from 'immer'
import { useMutation } from 'react-query'
import { GoalDto } from 'dto'
import TaskService from 'services/TaskService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(id: number, goalID: number, rest: number): () => void {
  const timerRef = useRef<NodeJS.Timeout>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { mutate } = useMutation(TaskService.setCompleted, {
    onError() {
      mutateCompleted(false)
    },
  })

  function onUndo() {
    timerRef.current && clearTimeout(timerRef.current)
    mutateCompleted(false)
    closeSnackbar()
  }

  const mutateCompleted = (value: boolean) => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        const draftGoal = draft[draft.findIndex((g) => g.id === goalID)]
        const draftTask = draftGoal.day.tasks[draftGoal.day.tasks.findIndex((t) => t.id === id)]
        draftTask.completed = value
      }),
    )
  }

  return () => {
    const newRest = rest - 1

    mutateCompleted(true)
    enqueueSnackbar({
      message: !newRest ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${newRest}`,
      severity: 'success',
      icon: !newRest ? 'motivation-tech' : 'energy',
      action: <Button onClick={onUndo}>Undo</Button>,
    })
    timerRef.current = setTimeout(() => mutate(id), 4000)
  }
}
