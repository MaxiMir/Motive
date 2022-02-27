import { Session } from 'next-auth'
import { Provider } from 'next-auth/providers'
import { UserDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { GoalDto } from './goal'

export interface PageProps {
  session: Session | null
  statusCode?: number
  providers: Record<string, Provider> | null
}

export interface PossiblePageError {
  message?: {
    statusCode: number
  }
}

type Page<T> = {
  content: T
}

export type RatingPageDto = Page<{ [k in MainCharacteristicName]: UserDto[] }>

export type SubscriptionPageDto = Page<UserDto[]>

export type UserPageDto = Page<UserDetailDto>

export interface UserDetailDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  goalsMember: GoalDto[]
}
