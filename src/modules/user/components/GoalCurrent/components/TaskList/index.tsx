import { Box } from '@mui/material'
import { GoalDto, MemberDto } from 'src/common/dto'
import { GoalInfo } from '@modules/user/components/GoalCurrent/helper'
import Task from './components/Task'
import { redefineTasks } from './helper'

interface TaskListProps {
  goal: GoalDto
  goalInfo: GoalInfo
  userMember?: MemberDto
  clientMember?: MemberDto
}

export default function TaskList({ goal, goalInfo, userMember, clientMember }: TaskListProps) {
  const { id, day } = goal
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
