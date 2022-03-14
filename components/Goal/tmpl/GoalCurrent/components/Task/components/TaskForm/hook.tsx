import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import TaskService from 'services/TaskService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/UserView/hook'
import { getGoalNextState } from './helper'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(goalId: number, id: number, rest: number): () => void {
  const timerRef = useRef<NodeJS.Timeout>()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
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
    mutateGoals(getGoalNextState(goals, goalId, id, value))
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
