import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useSetCompleted } from 'features/task/set-completed'
import { TaskDto } from 'shared/api'
import Checkbox from 'shared/ui/checkbox'
import { Interaction } from '../lib'

const Markdown = dynamic(() => import('shared/ui/markdown'))
const Priority = dynamic(() => import('./priority'))
const ForFuture = dynamic(() => import('./for-future'))
const CompletedByOthers = dynamic(() => import('./completed-by-others'))
const TaskDate = dynamic(() => import('./task-date'))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  interaction: Interaction
}

export function Task({ goalId, task, rest, interaction }: TaskProps) {
  const { id, date, completed } = task
  const { forFuture, canEdit, daysGone } = interaction
  const setCompleted = useSetCompleted(goalId, id, rest)
  const disabled = completed || forFuture || !canEdit
  const { name, description, priority } = task
  const completedByOthers = !daysGone && task.completedByOthers && !task.completed

  return (
    <Stack gap={1}>
      <form>
        <Checkbox
          name={id.toString()}
          label={
            <Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                {name}
                {priority && <Priority priority={priority} />}
                {forFuture && <ForFuture />}
                {completedByOthers && <CompletedByOthers />}
              </Stack>
              {description && <Markdown text={description} footnote />}
            </Stack>
          }
          checked={completed}
          disabled={disabled}
          onChange={setCompleted}
        />
      </form>
      {date && <TaskDate date={date} />}
    </Stack>
  )
}
