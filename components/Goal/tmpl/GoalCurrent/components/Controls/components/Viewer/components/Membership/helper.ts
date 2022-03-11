import { GoalDto, ClientDto, UserPageDto } from 'dto'

export const checkOnMember = (goal: GoalDto, page?: UserPageDto, client?: ClientDto): boolean => {
  return Boolean(client && page?.content.membership.some((m) => m.userId === client.id && m.goalId === goal.id))
}
