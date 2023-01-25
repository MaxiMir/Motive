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
  message?: {
    statusCode: number
  }
}

export interface HashtagDto {
  name: string
  views: number
}

export interface SearchPageDto {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

export type RatingPageDto = { [k in MainCharacteristicName]: UserDto[] }

export interface FollowingPageDto {
  following: UserDto[]
}

export interface UserPageDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  membership: MemberDto[]
  clientMembership: MemberDto[]
  confirmations: ConfirmationDto[]
}
