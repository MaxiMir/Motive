import dynamic from 'next/dynamic'
import { TaskDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppBox from 'components/UI/AppBox'
import AppCheckbox from 'components/UI/AppCheckbox'
import AppMarkdown from 'components/UI/AppMarkdown'
import useSetCompleted from './hook'

const TaskDate = dynamic(() => import('../TaskDate'))
const CompletedByOther = dynamic(() => import('./components/CompletedByOther'))

interface FormProps {
  goalId: number
  task: TaskDto
  rest: number
  daysGone: number
  forTomorrow: boolean
}

export default function TaskForm({ goalId, task, rest, daysGone, forTomorrow }: FormProps): JSX.Element {
  const { id, name, completed, completedByOther, date } = task
  const setCompleted = useSetCompleted(goalId, id, rest)
  const withFire = !daysGone && completedByOther && !completed

  return (
    <form>
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <AppCheckbox
          name={id.toString()}
          label={
            <AppBox alignItems="center" spacing={1}>
              <AppMarkdown text={name} />
              {withFire && <CompletedByOther />}
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
