import React, { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import Axios from 'lib/axios'
import { Task } from 'dto'
import ROUTE from 'route'
import useDebounceCb from 'hooks/useDebounceCb'
import AppCheckbox from 'components/UI/AppCheckbox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const GoalCardTaskDate = dynamic(() => import('./GoalCardTaskDate'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

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
  const [checked, setChecked] = useState(initial)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate, isLoading } = useMutation((completed: boolean) => Axios.put(ROUTE.getTaskId(id), { completed }), {
    onSuccess(_, completed) {
      completed && setSeverity('success')
      onSet(completed)
    },
    onError(_, completed) {
      setChecked(!completed)
      setSeverity('error')
    },
  })
  const snackbarInfo = severity && getSnackbarInfo()
  const mutateWithDebounce = useDebounceCb(mutate, 500)

  const onChange = (_: ChangeEvent<unknown>, isChecked: boolean) => {
    setChecked(isChecked)
    mutateWithDebounce(isChecked)
  }

  function onUndo() {
    setChecked(!checked)
    setSeverity(undefined)
    mutate(!checked)
  }

  function getSnackbarInfo() {
    if (severity === 'error') {
      return {
        icon: undefined,
        content: 'Something went wrong...',
      }
    }

    return {
      icon: !rest ? '🦾️' : '⚡️',
      content: !rest ? 'Well done! All tasks are completed' : `Do it! Remains to be done: ${rest}`,
    }
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
      {severity && (
        <AppSnackbar
          icon={snackbarInfo?.icon}
          severity={severity}
          autoHideDuration={3000}
          action={severity !== 'success' ? undefined : <Button onClick={onUndo}>Undo</Button>}
          onClose={() => setSeverity(undefined)}
        >
          {snackbarInfo?.content}
        </AppSnackbar>
      )}
    </form>
  )
}
