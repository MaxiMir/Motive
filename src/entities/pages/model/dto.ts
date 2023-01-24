import { UserDto } from '@entities/user'
import { GoalDto } from '@entities/goal'
import { ConfirmationDto } from '@entities/confirmation'
import { MainCharacteristicName } from '@entities/characteristic'
import { MemberDto } from '@entities/member'

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
