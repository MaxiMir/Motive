import { GoalDto } from './goal'
import { UserDto } from './user'
import { MemberDto } from './member'
import { MainCharacteristicName } from './characteristic'
import { ConfirmationDto } from './confirmation'

export const enum OGType {
  Website = 'website',
  Profile = 'profile',
}

export interface PossiblePageError {
  readonly message?: {
    statusCode: number
  }
}

export interface HashtagDto {
  name: string
  views: number
}

export interface SearchPageDto {
  readonly q: string
  readonly hashtags: HashtagDto[]
  readonly goals: GoalDto[]
  readonly users: UserDto[]
}

export type RatingPageDto = Readonly<{ [k in MainCharacteristicName]: UserDto[] }>

export interface FollowingPageDto {
  readonly following: UserDto[]
}

export interface UserPageDto extends UserDto {
  readonly following: boolean
  readonly goals: GoalDto[]
  readonly membership: MemberDto[]
  readonly clientMembership: MemberDto[]
  readonly confirmations: ConfirmationDto[]
}
