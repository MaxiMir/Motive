import dynamic from 'next/dynamic'
import { TaskDto } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  task: TaskDto
  rest: number
  onSet: (isCompleted: boolean) => void
}

export default function TaskForm({ task, rest, onSet }: FormProps): JSX.Element {
  const { id, name, completedByOthers, date } = task
  const [isLoading, checked, onChange] = useSetCompleted(task, rest, onSet)
  const label = name + (completedByOthers && !checked ? ' 🔥' : '')

  return (
    <form>
      <AppCheckbox
        name={id.toString()}
        label={label}
        checked={checked}
        disabled={checked || isLoading}
        onChange={onChange}
      />
      {date && <TaskDate date={date} />}
    </form>
  )
}
