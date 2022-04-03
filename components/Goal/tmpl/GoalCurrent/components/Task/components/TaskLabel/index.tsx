import dynamic from 'next/dynamic'
import { TaskDto } from 'dto'
import AppMarkdown from 'components/UI/AppMarkdown'
import AppBox from 'components/UI/AppBox'
import { checkOnCompletedByOther } from './helper'

const CompletedByOther = dynamic(() => import('./components/CompletedByOther'))

interface TaskLabelProps {
  task: TaskDto
  daysGoneForOwner: number
}

export default function TaskLabel({ task, daysGoneForOwner }: TaskLabelProps): JSX.Element {
  const completedByOther = checkOnCompletedByOther(task, daysGoneForOwner)

  return (
    <AppBox alignItems="center" spacing={1}>
      <AppMarkdown text={task.name} />
      {completedByOther && <CompletedByOther />}
    </AppBox>
  )
}
