import { GoalDto, RoleDto, UserBaseDto } from 'dto'

export const getRole = (goal: GoalDto, client?: UserBaseDto): RoleDto => {
  switch (true) {
    case goal.owner.id === client?.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}
