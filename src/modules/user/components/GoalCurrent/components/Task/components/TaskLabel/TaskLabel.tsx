import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TaskDto } from '@dto'
import { checkOnCompletedByOthers } from './helper'

const CompletedByOthers = dynamic(() => import('./components/CompletedByOthers'))
const AppMarkdown = dynamic(() => import('@ui/AppMarkdown'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

export default function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps) {
  const completedByOthers = checkOnCompletedByOthers(task, daysGoneForOwner)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppMarkdown text={task.name} />
      {completedByOthers && <CompletedByOthers />}
    </Box>
  )
}
