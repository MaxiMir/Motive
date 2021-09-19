import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Task } from 'dto'
import TaskService from 'services/TaskService'
import useSend from 'hooks/useSend'
import { useSnackbar } from 'hooks/useSnackbar'
import AppCheckbox from 'components/UI/AppCheckbox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const GoalCardTaskDate = dynamic(() => import('./GoalCardTaskDate'))

interface GoalCardTaskFormProps extends Task {
  rest: number
  onSet: (completed: boolean) => void
}

export default function GoalCardTaskForm({
  id,
  name,
  completed: initial,
  completedByOthers,
  date,
  rest,
  onSet,
}: GoalCardTaskFormProps): JSX.Element {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [checked, setChecked] = useState(initial)
  const { isLoading, send } = useSend(TaskService.updateTask, {
    onSuccess(_, data) {
      const restWithNew = rest - 1

      data.isCompleted &&
        enqueueSnackbar({
          message: !restWithNew ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${restWithNew}`,
          severity: 'success',
          icon: !restWithNew ? '🦾️' : '⚡️',
          action: <Button onClick={onUndo}>Undo</Button>,
        })
    },
    onError(_, completed) {
      setChecked(!completed)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const onChange = (isChecked: boolean) => {
    onSet(isChecked)
    setChecked(isChecked)
    send({ id, name, completed: isChecked, completedByOthers })
  }

  function onUndo() {
    onChange(false)
    closeSnackbar()
  }

  return (
    <form>
      <AppCheckbox
        name={id}
        label={name + (completedByOthers && !checked ? ' 🔥' : '')}
        checked={checked}
        disabled={checked || isLoading}
        onChange={(_, isChecked) => onChange(isChecked)}
      />
      {date && <GoalCardTaskDate date={date} />}
    </form>
  )
}
