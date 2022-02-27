import { GoalDto, RoleDto, ClientDto } from 'dto'

export const getRole = (goal: GoalDto, client?: ClientDto): RoleDto => {
  switch (true) {
    case goal.owner.id === client?.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}
