import { UserDto } from './user'
import { ConfirmationDto, GoalDto } from './goal'
import { MemberDto } from './member'
import { HashtagDto } from './hashtag'
import { MainCharacteristicName } from './characteristic'

export enum OGType {
  Website = 'website',
  Profile = 'profile',
}

export interface PossiblePageError {
  message?: {
    statusCode: number
  }
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
