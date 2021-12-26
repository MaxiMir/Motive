import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { TaskDto } from 'dto'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import TaskService from 'services/TaskService'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(
  task: TaskDto,
  rest: number,
  onSet: (isCompleted: boolean) => void,
): [boolean, boolean, () => void] {
  const { id, completed } = task
  const timerIdRef = useRef<NodeJS.Timeout>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [checked, setChecked] = useState(completed)
  const { isLoading, send } = useSend(TaskService.updateTask, {
    onError() {
      onSet(false)
      setChecked(false)
    },
  })

  const onChange = () => {
    const restWithNew = rest - 1

    onSet(true)
    setChecked(true)
    enqueueSnackbar({
      message: !restWithNew ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${restWithNew}`,
      severity: 'success',
      icon: !restWithNew ? 'motivation-tech' : 'energy',
      action: <Button onClick={onUndo}>Undo</Button>,
    })
    timerIdRef.current = setTimeout(() => send({ id }), 4000)
  }

  function onUndo() {
    timerIdRef.current && clearTimeout(timerIdRef.current)
    onSet(false)
    setChecked(false)
    closeSnackbar()
  }

  return [isLoading, checked, onChange]
}
