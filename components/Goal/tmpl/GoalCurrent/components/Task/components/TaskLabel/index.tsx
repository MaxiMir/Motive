import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { TaskDto } from 'dto'
import AppMarkdown from 'components/UI/AppMarkdown'
import { checkOnCompletedByOther } from './helper'

const CompletedByOther = dynamic(() => import('./components/CompletedByOther'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

export default function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps): JSX.Element {
  const completedByOther = checkOnCompletedByOther(task, daysGoneForOwner)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppMarkdown text={task.name} />
      {completedByOther && <CompletedByOther />}
    </Box>
  )
}
