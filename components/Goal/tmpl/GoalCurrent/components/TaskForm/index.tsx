import dynamic from 'next/dynamic'
import { RoleDto, TaskDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))

interface FormProps {
  goalId: number
  task: TaskDto
  rest: number
  role: RoleDto
  clientId: number
  forTomorrow: boolean
}

export default function TaskForm({ goalId, task, rest, clientId, role, forTomorrow }: FormProps): JSX.Element {
  const { id, name, completed, completedBy, date } = task
  const label = name + (completedBy.length && !completed ? ' 🔥' : '')
  const checked = role === 'OWNER' ? completed : completedBy.includes(clientId)
  const setCompleted = useSetCompleted(goalId, id, rest)

  return (
    <form>
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <AppCheckbox
          name={id.toString()}
          label={<AppMarkdown text={label} />}
          checked={checked}
          disabled={checked || forTomorrow}
          onChange={setCompleted}
        />
      </TooltipTomorrow>
      {date && <TaskDate date={date} />}
    </form>
  )
}
