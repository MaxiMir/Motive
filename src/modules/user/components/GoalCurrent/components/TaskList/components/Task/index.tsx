import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Tooltip } from '@mui/material'
import { MemberDto, TaskDto } from 'src/common/dto'
import { GoalInfo } from '@modules/user/components/GoalCurrent/helper'
import AppCheckbox from 'src/common/ui/AppCheckbox'
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

export default function Task({ goalId, task, rest, goalInfo, clientMember }: TaskProps) {
  const { id, date, completed } = task
  const { formatMessage } = useIntl()
  const { forTomorrow, daysGoneForOwner } = goalInfo
  const setCompleted = useSetCompleted(goalId, id, rest, clientMember)
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const disabled = completed || forTomorrow || !goalInfo.canEdit

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <form>
        <Tooltip title={title} arrow followCursor>
          <span>
            <AppCheckbox
              name={id.toString()}
              label={<TaskLabel task={task} daysGoneForOwner={daysGoneForOwner} />}
              checked={completed}
              disabled={disabled}
              onChange={setCompleted}
            />
          </span>
        </Tooltip>
      </form>
      {date && <TaskDate date={date} />}
    </Box>
  )
}
