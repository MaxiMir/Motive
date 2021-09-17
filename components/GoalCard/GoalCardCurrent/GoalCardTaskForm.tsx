import React, { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { Task } from 'dto'
import ROUTE from 'route'
import useDebounceCb from 'hooks/useDebounceCb'
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
  const url = ROUTE.getTaskId(id)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [checked, setChecked] = useState(initial)
  const { isLoading, send } = useSend({
    onSuccess(_, completed) {
      const restWithNew = rest - 1

      completed &&
        enqueueSnackbar({
          message: !restWithNew ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${restWithNew}`,
          severity: 'success',
          icon: !restWithNew ? '🦾️' : '⚡️',
          action: <Button onClick={onUndo}>Undo</Button>,
        })
      onSet(completed)
    },
    onError(_, completed) {
      setChecked(!completed)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const mutateWithDebounce = useDebounceCb((data) => send({ url, method: 'put', data }), 500)

  const onChange = (_: ChangeEvent<unknown>, isChecked: boolean) => {
    setChecked(isChecked)
    mutateWithDebounce(isChecked)
  }

  function onUndo() {
    setChecked(!checked)
    closeSnackbar()
    send({ url, method: 'put', data: !checked })
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
      {date && <GoalCardTaskDate date={date} />}
    </form>
  )
}
