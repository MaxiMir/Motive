import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { MemberDto } from 'dto'
import TaskService from 'services/TaskService'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateUserPage } from 'views/UserView/hook'
import { getGoalNextState } from './helper'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(
  goalId: number,
  id: number,
  rest: number,
  clientMember?: MemberDto,
): () => void {
  const timerRef = useRef<NodeJS.Timeout>()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [page, mutatePage] = useMutateUserPage()
  const { mutate } = useMutation(TaskService.updateCompleted, {
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
    mutatePage(getGoalNextState(page, goalId, id, value, clientMember))
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
