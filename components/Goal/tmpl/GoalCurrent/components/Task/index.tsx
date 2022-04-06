import dynamic from 'next/dynamic'
import { MemberDto, TaskDto } from 'dto'
import { GoalInfo } from 'components/Goal/tmpl/GoalCurrent/helper'
import AppBox from 'components/UI/AppBox'
import AppCheckbox from 'components/UI/AppCheckbox'
import useSetCompleted from './hook'
import TooltipTomorrow from '../TooltipTomorrow'
import TaskLabel from './components/TaskLabel'

const TaskDate = dynamic(() => import('./components/TaskDate'))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  goalInfo: GoalInfo
  clientMember?: MemberDto
}

export default function Task({ goalId, task, rest, goalInfo, clientMember }: TaskProps): JSX.Element {
  const { id, date, completed } = task
  const { form, forTomorrow, daysGoneForOwner } = goalInfo
  const setCompleted = useSetCompleted(goalId, id, rest, clientMember)
  const disabled = completed || forTomorrow || !form

  return (
    <AppBox flexDirection="column" gap={1}>
      <form>
        <TooltipTomorrow forTomorrow={forTomorrow}>
          <AppCheckbox
            name={id.toString()}
            label={<TaskLabel task={task} daysGoneForOwner={daysGoneForOwner} />}
            checked={completed}
            disabled={disabled}
            onChange={setCompleted}
          />
        </TooltipTomorrow>
      </form>
      {date && <TaskDate date={date} />}
    </AppBox>
  )
}
