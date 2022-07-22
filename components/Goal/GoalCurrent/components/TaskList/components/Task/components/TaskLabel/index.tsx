import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TaskDto } from 'dto'
import { checkOnCompletedByOther } from './helper'

const CompletedByOther = dynamic(() => import('./components/CompletedByOther'))
const AppMarkdown = dynamic(() => import('components/ui/AppMarkdown'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

export default function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps) {
  const completedByOther = checkOnCompletedByOther(task, daysGoneForOwner)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppMarkdown text={task.name} />
      {completedByOther && <CompletedByOther />}
    </Box>
  )
}
