import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto, TaskDto, UserBaseDto } from 'dto'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import TaskService from 'services/TaskService'

const Button = dynamic(() => import('@material-ui/core/Button'))

export default function useSetCompleted(
  task: TaskDto,
  rest: number,
  client: UserBaseDto,
  role: RoleDto,
  onSet: (isCompleted: boolean) => void,
): [boolean, boolean, () => void] {
  const { id, completed, completedBy } = task
  const timerIdRef = useRef<NodeJS.Timeout>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [active, setActive] = useState(role === 'OWNER' ? completed : completedBy.includes(client.id))

  const { isLoading, send } = useSend(TaskService.setCompleted, {
    onError() {
      onSet(false)
      setActive(false)
    },
  })

  const onChange = () => {
    const restWithNew = rest - 1

    onSet(true)
    setActive(true)
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
    setActive(false)
    closeSnackbar()
  }

  useEffect(() => {
    setActive(role === 'OWNER' ? completed : completedBy.includes(client.id))
  }, [client.id, completed, completedBy, role, task.completed, task.completedBy])

  return [isLoading, active, onChange]
}
