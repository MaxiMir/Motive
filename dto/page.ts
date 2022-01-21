import { UserDto, UserBaseDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { GoalDto } from './goal'

export type PageSWR<T> = {
  fallbackData: T
}

type Page<T> = {
  client: UserBaseDto
  content: T
}

export type MainPageDto = Page<null>

export type MainPageSWRDto = PageSWR<MainPageDto>

export type RatingPageDto = Page<{ [k in MainCharacteristicName]: UserDto[] }>

export type RatingPageSWRDto = PageSWR<RatingPageDto>

export type SubscriptionPageDto = Page<UserDto[]>

export type SubscriptionPageSWRDto = PageSWR<SubscriptionPageDto>

export type UserPageDto = Page<UserDetailDto>

export type UserPageSWRDto = PageSWR<UserPageDto>

export interface UserDetailDto extends UserDto {
  isFollowing: boolean
  goals: GoalDto[]
  goalsMember: GoalDto[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
