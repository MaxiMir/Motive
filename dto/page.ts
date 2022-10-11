import { Session } from 'next-auth'
import { UserDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { ConfirmationDto, GoalDto } from './goal'
import { MemberDto } from './member'
import { HashtagDto } from './hashtag'

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

export type SearchPageDto = Page<SearchPageContent>
export type RatingPageDto = Page<RatingPageContent>
export type SubscriptionPageDto = Page<SubscriptionPageContent>
export type UserPageDto = Page<UserDetailDto>

interface SearchPageContent {
  q: string
  hashtags: HashtagDto[]
  goals: GoalDto[]
  users: UserDto[]
}

type RatingPageContent = { [k in MainCharacteristicName]: UserDto[] }
type SubscriptionPageContent = UserDto[]

export interface UserDetailDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  userMembership: MemberDto[]
  clientMembership: MemberDto[]
  confirmations: ConfirmationDto[]
}
