import { Session } from 'next-auth'
import { UserDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { GoalDto } from './goal'
import { MemberDto } from './member'

export interface PageProps {
  session: Session | null
  statusCode?: number
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
  userMembership: MemberDto[]
  clientMembership: MemberDto[]
}
