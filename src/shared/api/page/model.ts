import { MainCharacteristicName } from '../characteristic'
import { ConfirmationDto } from '../confirmation'
import { GoalDto } from '../goal'
import { MemberDto } from '../member'
import { UserDto } from '../user'

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
  readonly clientMembership: MemberDto[]
  readonly confirmations: ConfirmationDto[]
}
