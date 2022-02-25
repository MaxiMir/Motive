import { Provider } from 'next-auth/providers'
import { UserDto, UserBaseDto } from './user'
import { MainCharacteristicName } from './characteristic'
import { GoalDto } from './goal'

export interface PageProps {
  providers: Providers
  statusCode: number
}

export type Providers = Record<string, Provider>

export interface PossiblePageError {
  message?: {
    statusCode: number
  }
}

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
