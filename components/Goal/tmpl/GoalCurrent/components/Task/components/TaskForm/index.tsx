import dynamic from 'next/dynamic'
import { TaskDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppBox from 'components/UI/AppBox'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))
const CompletedByOther = dynamic(() => import('components/Goal/tmpl/GoalCurrent/components/CompletedByOther'))

interface TaskFormProps {
  goalId: number
  task: TaskDto
  rest: number
  forTomorrow: boolean
  completedByOther: boolean
}

export default function TaskForm({ goalId, task, rest, forTomorrow, completedByOther }: TaskFormProps): JSX.Element {
  const { id, name, date, completed } = task
  const setCompleted = useSetCompleted(goalId, id, rest)

  return (
    <form>
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <AppCheckbox
          name={id.toString()}
          label={
            <AppBox alignItems="center" spacing={1}>
              <AppMarkdown text={name} />
              {completedByOther && <CompletedByOther />}
            </AppBox>
          }
          checked={completed}
          disabled={completed || forTomorrow}
          onChange={setCompleted}
        />
      </TooltipTomorrow>
      {date && <TaskDate date={date} />}
    </form>
  )
}
