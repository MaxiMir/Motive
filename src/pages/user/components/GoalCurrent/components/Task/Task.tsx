import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Stack } from '@mui/material'
import { MemberDto } from '@shared/api/member'
import { TaskDto } from '@shared/api/task'
import Checkbox from '@shared/ui/Checkbox'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import TaskLabel from './components/TaskLabel'
import { useSetCompleted } from './hooks/useSetCompleted'

const TaskDate = dynamic(() => import('./components/TaskDate'))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  clientMember?: MemberDto
  forTomorrow: boolean
  daysGoneForOwner: number
  canEdit: boolean
}

function Task({
  goalId,
  task,
  rest,
  clientMember,
  forTomorrow,
  daysGoneForOwner,
  canEdit,
}: TaskProps) {
  const { id, date, completed } = task
  const { formatMessage } = useIntl()
  const setCompleted = useSetCompleted(goalId, id, rest, clientMember)
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const disabled = completed || forTomorrow || !canEdit

  return (
    <Stack spacing={1}>
      <form>
        <TooltipArrow title={title}>
          <Checkbox
            name={id.toString()}
            label={<TaskLabel task={task} daysGoneForOwner={daysGoneForOwner} />}
            checked={completed}
            disabled={disabled}
            onChange={setCompleted}
          />
        </TooltipArrow>
      </form>
      {date && <TaskDate date={date} />}
    </Stack>
  )
}

export default Task
