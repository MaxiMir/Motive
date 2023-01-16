import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TaskDto } from '@features/task'
import { checkOnCompletedByOthers } from './helper'

const AppMarkdown = dynamic(() => import('@features/markdown'))
const CompletedByOthers = dynamic(() => import('./components/CompletedByOthers'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps) {
  const completedByOthers = checkOnCompletedByOthers(task, daysGoneForOwner)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppMarkdown text={task.name} />
      {completedByOthers && <CompletedByOthers />}
    </Box>
  )
}

export default TaskLabel
