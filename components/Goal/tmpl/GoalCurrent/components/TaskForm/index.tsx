import dynamic from 'next/dynamic'
import { RoleDto, TaskDto, UserBaseDto } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  goalId: number
  task: TaskDto
  rest: number
  role: RoleDto
  client: UserBaseDto
  forTomorrow: boolean
}

export default function TaskForm({ goalId, task, rest, client, role, forTomorrow }: FormProps): JSX.Element {
  const { id, name, completed, completedBy, date } = task
  const label = name + (completedBy.length && !completed ? ' 🔥' : '')
  const checked = role === 'OWNER' ? completed : completedBy.includes(client.id)
  const setCompleted = useSetCompleted(id, goalId, rest)

  return (
    <form>
      <AppOptionalTooltip title={!forTomorrow ? undefined : 'Will be available tomorrow'}>
        <AppCheckbox
          name={id.toString()}
          label={<AppMarkdown text={label} />}
          checked={checked}
          disabled={checked || forTomorrow}
          onChange={setCompleted}
        />
      </AppOptionalTooltip>
      {date && <TaskDate date={date} />}
    </form>
  )
}
