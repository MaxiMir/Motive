import { Box } from '@mui/material'
import { GoalDto, MemberDto } from 'dto'
import { getMember } from 'views/UserView/helper'
import { GoalInfo } from 'components/Goal/tmpl/GoalCurrent/helper'
import Task from './components/Task'
import { redefineTasks } from './helper'

interface TaskListProps {
  goal: GoalDto
  goalInfo: GoalInfo
  userId: number
  userMembership: MemberDto[]
  clientMember?: MemberDto
}

export default function TaskList({ goal, goalInfo, userId, userMembership, clientMember }: TaskListProps): JSX.Element {
  const { id, day } = goal
  const userMember = getMember(id, userMembership, userId)
  const redefinedGoals = redefineTasks(day.tasks, userMember)
  const rest = redefinedGoals.length - redefinedGoals.filter((t) => t.completed).length

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {redefinedGoals.map((task) => (
        <Task goalId={id} task={task} rest={rest} goalInfo={goalInfo} clientMember={clientMember} key={task.id} />
      ))}
    </Box>
  )
}
