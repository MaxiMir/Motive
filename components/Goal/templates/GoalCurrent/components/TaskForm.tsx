import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Task } from 'dto'
import TaskService from 'services/TaskService'
import useSend from 'hooks/useSend'
import { useSnackbar } from 'hooks/useSnackbar'
import AppCheckbox from 'components/UI/AppCheckbox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const TaskDate = dynamic(() => import('./TaskDate'))

interface FormProps extends Task {
  rest: number
  onSet: (isCompleted: boolean) => void
}

export default function TaskForm({
  id,
  name,
  completed: initial,
  completedByOthers,
  date,
  rest,
  onSet,
}: FormProps): JSX.Element {
  const timerIdRef = useRef<NodeJS.Timeout>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [checked, setChecked] = useState(initial)
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

  return (
    <form>
      <AppCheckbox
        name={id}
        label={name + (completedByOthers && !checked ? ' 🔥' : '')}
        checked={checked}
        disabled={checked || isLoading}
        onChange={onChange}
      />
      {date && <TaskDate date={date} />}
    </form>
  )
}
