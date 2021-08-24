import React, { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import Axios from 'lib/axios'
import { Task } from 'dto'
import ROUTE from 'route'
import useDebounceCb from 'hooks/useDebounceCb'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppBox from 'components/UI/AppBox'

const Button = dynamic(() => import('@material-ui/core/Button'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))
const AppEmoji = dynamic(() => import('components/UI/AppEmoji'))

interface GoalCardTaskFormProps extends Task {
  rest: number
  onSet: (completed: boolean) => void
}

export default React.memo(function GoalCardTaskForm({
  id,
  name,
  completed: initial,
  completedByOthers,
  rest,
  onSet,
}: GoalCardTaskFormProps): JSX.Element {
  const [checked, setChecked] = useState(initial)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate, isLoading } = useMutation((completed: boolean) => Axios.put(ROUTE.getTaskId(id), { completed }), {
    onSuccess: (_, completed) => {
      completed && setSeverity('success')
      onSet(completed)
    },
    onError: (_, completed) => {
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
    mutateWithDebounce(!checked)
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
      <AppBox alignItems="center">
        <AppCheckbox
          name={id}
          label={name}
          checked={checked}
          disabled={checked || isLoading}
          key={id}
          onChange={onChange}
        />
        {completedByOthers && !checked && <AppEmoji name="completedByOthers" variant="subtitle1" />}
      </AppBox>
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
})
