import React, { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import Axios from 'lib/axios'
import { Task } from 'dto'
import ROUTE from 'route'
import useDebounceCb from 'hooks/useDebounceCb'
import AppCheckbox from 'components/UI/AppCheckbox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface GoalCardTaskProps extends Task {
  rest: number
  onSet: (completed: boolean) => void
}

export default function GoalCardTask({ id, name, completed: initial, rest, onSet }: GoalCardTaskProps): JSX.Element {
  const [checked, setChecked] = useState(initial)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate, isLoading } = useMutation((completed: boolean) => Axios.put(`${ROUTE.TASK}/${id}`, { completed }), {
    onSuccess: (_, completed) => {
      completed && setSeverity('success')
      onSet(completed)
    },
    onError: (_, completed) => {
      setChecked(!completed)
      setSeverity('error')
    },
  })
  const mutateWithDebounce = useDebounceCb(mutate, 500)

  const onChange = (_: ChangeEvent<unknown>, isChecked: boolean) => {
    setChecked(isChecked)
    mutateWithDebounce(isChecked)
  }

  function onUndo() {
    setChecked(!checked)
    mutateWithDebounce(!checked)
    setSeverity(undefined)
  }

  return (
    <form>
      <AppCheckbox
        name={id}
        label={name}
        checked={checked}
        disabled={checked || isLoading}
        key={id}
        onChange={onChange}
      />
      {severity && (
        <AppSnackbar
          icon={severity !== 'success' ? '❗' : '🦾️'}
          severity={severity}
          autoHideDuration={3000}
          action={severity !== 'success' ? undefined : <Button onClick={onUndo}>Undo</Button>}
          onClose={() => setSeverity(undefined)}
        >
          {severity === 'success' && !rest
            ? 'Well done! All tasks are completed'
            : `Do it! Remains to be done: ${rest}`}
          {severity === 'error' && 'Something went wrong...'}
        </AppSnackbar>
      )}
    </form>
  )
}
