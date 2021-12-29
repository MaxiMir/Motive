import dynamic from 'next/dynamic'
import { RoleDto, TaskDto, UserBaseDto } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  goalId: number
  task: TaskDto
  rest: number
  role: RoleDto
  client: UserBaseDto
}

export default function TaskForm({ goalId, task, rest, client, role }: FormProps): JSX.Element {
  const { id, name, completed, completedBy, date } = task
  const checked = role === 'OWNER' ? completed : completedBy.includes(client.id)
  const label = name + (completedBy.length && !completed ? ' 🔥' : '')
  const setCompleted = useSetCompleted(id, goalId, rest)

  return (
    <form>
      <AppCheckbox name={id.toString()} label={label} checked={checked} disabled={checked} onChange={setCompleted} />
      {date && <TaskDate date={date} />}
    </form>
  )
}
