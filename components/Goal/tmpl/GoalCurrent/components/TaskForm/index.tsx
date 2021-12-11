import dynamic from 'next/dynamic'
import { Task } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  task: Task
  rest: number
  onSet: (isCompleted: boolean) => void
}

export default function TaskForm({ task, rest, onSet }: FormProps): JSX.Element {
  const { id, name, completedByOthers, date } = task
  const [isLoading, checked, onChange] = useSetCompleted(task, rest, onSet)
  const label = name + (completedByOthers && !checked ? ' 🔥' : '')

  return (
    <form>
      <AppCheckbox name={id} label={label} checked={checked} disabled={checked || isLoading} onChange={onChange} />
      {date && <TaskDate date={date} />}
    </form>
  )
}
