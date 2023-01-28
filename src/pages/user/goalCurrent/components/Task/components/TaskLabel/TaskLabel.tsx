import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { TaskDto } from 'shared/api'
import { checkOnCompletedByOthers } from './helper'

const Markdown = dynamic(() => import('features/markdown'))
const CompletedByOthers = dynamic(() => import('./components/CompletedByOthers'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps) {
  const completedByOthers = checkOnCompletedByOthers(task, daysGoneForOwner)

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Markdown text={task.name} />
      {completedByOthers && <CompletedByOthers />}
    </Stack>
  )
}

export default TaskLabel
