import { UserDto, UserBaseDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { GoalDto } from './goal'

type Page<T> = {
  client?: UserBaseDto
  content: T
}

export type MainPageDto = Page<null>

export type RatingPageDto = Page<{ [k in MainCharacteristicName]: UserDto[] }>

export type SubscriptionPageDto = Page<UserDto[]>

export type UserPageDto = Page<UserDetailDto>

export interface UserDetailDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  goalsMember: GoalDto[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
