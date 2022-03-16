import dynamic from 'next/dynamic'
import { MemberDto, TaskDto } from 'dto'
import { GoalInfo } from 'components/Goal/tmpl/GoalCurrent/helper'
import { checkOnCompletedByOther } from './helper'

const TaskText = dynamic(() => import('./components/TaskText'))
const TaskForm = dynamic(() => import('./components/TaskForm'))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  goalInfo: GoalInfo
  clientMember?: MemberDto
}

export default function Task({ goalId, task, rest, goalInfo, clientMember }: TaskProps): JSX.Element {
  const { form, forTomorrow, daysGoneForOwner } = goalInfo
  const completedByOther = checkOnCompletedByOther(task, daysGoneForOwner)

  return (
    <>
      {!form ? (
        <TaskText task={task} completedByOther={completedByOther} />
      ) : (
        <TaskForm
          goalId={goalId}
          task={task}
          rest={rest}
          forTomorrow={forTomorrow}
          completedByOther={completedByOther}
          clientMember={clientMember}
        />
      )}
    </>
  )
}
