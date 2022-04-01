import dynamic from 'next/dynamic'
import { MemberDto, TaskDto } from 'dto'
import { GoalInfo } from 'components/Goal/tmpl/GoalCurrent/helper'
import AppBox from 'components/UI/AppBox'
import { checkOnCompletedByOther } from './helper'

const TaskText = dynamic(() => import('./components/TaskText'))
const TaskForm = dynamic(() => import('./components/TaskForm'))
const TaskDate = dynamic(() => import('./components/TaskDate'))

interface TaskProps {
  goalId: number
  task: TaskDto
  rest: number
  goalInfo: GoalInfo
  clientMember?: MemberDto
}

export default function Task({ goalId, task, rest, goalInfo, clientMember }: TaskProps): JSX.Element {
  const { date } = task
  const { form, forTomorrow, daysGoneForOwner } = goalInfo
  const completedByOther = checkOnCompletedByOther(task, daysGoneForOwner)

  return (
    <AppBox alignItems="center" height={42} spacing={1}>
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
      {date && <TaskDate date={date} />}
    </AppBox>
  )
}
