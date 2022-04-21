import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { MemberDto, TaskDto } from 'dto'
import { GoalInfo } from 'components/Goal/GoalCurrent/helper'
import OptionalTooltip from 'components/OptionalTooltip'
import AppCheckbox from 'components/UI/AppCheckbox'
import TaskLabel from './components/TaskLabel'
import useSetCompleted from './hook'

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
    <Box display="flex" flexDirection="column" gap={1}>
      <form>
        <OptionalTooltip tmpl="tomorrow" wrap={forTomorrow} followCursor>
          <AppCheckbox
            name={id.toString()}
            label={<TaskLabel task={task} daysGoneForOwner={daysGoneForOwner} />}
            checked={completed}
            disabled={disabled}
            onChange={setCompleted}
          />
        </OptionalTooltip>
      </form>
      {date && <TaskDate date={date} />}
    </Box>
  )
}
