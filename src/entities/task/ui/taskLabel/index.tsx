import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { TaskDto } from 'shared/api'
import { checkOnCompletedByOthers } from './lib'

const Markdown = dynamic(() => import('shared/ui/markdown'))
const CompletedByOthers = dynamic(() => import('./completedByOthers'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

export function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps) {
  const completedByOthers = checkOnCompletedByOthers(task, daysGoneForOwner)

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Markdown text={task.name} />
      {completedByOthers && <CompletedByOthers />}
    </Stack>
  )
}
