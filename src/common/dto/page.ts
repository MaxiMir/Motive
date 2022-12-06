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

interface Page<T> {
  content: T
}

export type SearchPageDto = Page<SearchPageContent>
export type RatingPageDto = Page<RatingPageContent>
export type FollowingPageDto = Page<FollowingPageContent>
export type UserPageDto = Page<UserDetailDto>

interface SearchPageContent {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

type RatingPageContent = { [k in MainCharacteristicName]: UserDto[] }
type FollowingPageContent = UserDto[]

export interface UserDetailDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  membership: MemberDto[]
  clientMembership: MemberDto[]
  confirmations: ConfirmationDto[]
}
