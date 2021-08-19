import React, { ChangeEvent, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import Axios from 'lib/axios'
import { Task } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import AppCheckbox from 'components/UI/AppCheckbox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface GoalCardTaskProps extends Task {
  taskBalance: number
}

export default function GoalCardTask({ id, name, completed, taskBalance }: GoalCardTaskProps): JSX.Element {
  const lastUpdate = useRef(completed)
  const [checked, setChecked] = useState(completed)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate, isLoading } = useMutation(() => Axios.get('/favorites'), {
    onSuccess: () => {
      lastUpdate.current = checked
    },
    onError: () => setChecked(lastUpdate.current),
    onSettled: (_, error) => setSeverity(!error ? 'success' : 'error'),
  })
  const mutateWithDebounce = useDebounceCb(mutate, 500)

  const onChange = (_: ChangeEvent<unknown>, isChecked: boolean) => {
    setChecked(isChecked)
    mutateWithDebounce()
  }

  function onUndo() {
    setChecked(!checked)
    setSeverity(undefined)
    mutateWithDebounce()
  }

  return (
    <form>
      <AppCheckbox name={id} label={name} checked={checked} disabled={isLoading} key={id} onChange={onChange} />
      {severity && (
        <AppSnackbar
          icon={severity !== 'success' ? '❗' : '🦾️'}
          severity={severity}
          autoHideDuration={3000}
          action={severity !== 'success' ? undefined : <Button onClick={onUndo}>Undo</Button>}
          onClose={() => setSeverity(undefined)}
        >
          {severity !== 'success'
            ? 'Something went wrong...'
            : `Well done! ${taskBalance === 1 ? 'All tasks are completed' : `Remains to be done: ${taskBalance - 1}`}`}
        </AppSnackbar>
      )}
    </form>
  )
}
