import dynamic from 'next/dynamic'
import { OwnershipDto, TaskDto } from 'dto'
import { checkOnCompletedByOther, checkOnTaskForm } from './helper'

const TaskText = dynamic(() => import('./components/TaskText'))
const TaskForm = dynamic(() => import('./components/TaskForm'))

interface TaskProps {
  goalId: number
  dayId: number
  task: TaskDto
  rest: number
  daysGone: number
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function Task({
  goalId,
  dayId,
  task,
  rest,
  daysGone,
  forTomorrow,
  clientOwnership,
}: TaskProps): JSX.Element {
  const isForm = checkOnTaskForm(dayId, daysGone, clientOwnership)
  const completedByOther = checkOnCompletedByOther(task, daysGone)

  return (
    <>
      {!isForm ? (
        <TaskText task={task} completedByOther={completedByOther} />
      ) : (
        <TaskForm
          goalId={goalId}
          task={task}
          rest={rest}
          forTomorrow={forTomorrow}
          completedByOther={completedByOther}
        />
      )}
    </>
  )
}
