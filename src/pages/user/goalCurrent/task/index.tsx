import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useSetCompleted } from 'features/task/set-completed'
import { TaskLabel } from 'entities/task'
import { TaskDto } from 'shared/api'
import Checkbox from 'shared/ui/Checkbox'
import TooltipArrow from 'shared/ui/TooltipArrow'

const TaskDate = dynamic(() => import('entities/task').then((m) => m.TaskDate))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  forTomorrow: boolean
  daysGoneForOwner: number
  canEdit: boolean
}

export function Task({ goalId, task, rest, forTomorrow, daysGoneForOwner, canEdit }: TaskProps) {
  const { id, date, completed } = task
  const { formatMessage } = useIntl()
  const setCompleted = useSetCompleted(goalId, id, rest)
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const disabled = completed || forTomorrow || !canEdit

  return (
    <Stack gap={1}>
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
