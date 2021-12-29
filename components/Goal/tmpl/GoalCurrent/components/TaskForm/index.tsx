import dynamic from 'next/dynamic'
import { RoleDto, TaskDto, UserBaseDto } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  task: TaskDto
  rest: number
  role: RoleDto
  client: UserBaseDto
  onSet: (isCompleted: boolean) => void
}

export default function TaskForm({ task, rest, client, role, onSet }: FormProps): JSX.Element {
  const { id, name, completedBy, date } = task
  const [isLoading, checked, onChange] = useSetCompleted(task, rest, client, role, onSet)
  const label = name + (completedBy.length && !checked ? ' 🔥' : '')

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
