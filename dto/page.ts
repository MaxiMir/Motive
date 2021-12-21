import { User, UserBase } from './user'
import { MainCharacteristicName } from './characteristic'
import { Goal } from './goal'

export type PageSWR<T> = {
  fallbackData: T
}

type Page<T> = {
  client: UserBase
  content: T
}

export type MainPage = Page<null>

export type MainPageSWR = PageSWR<MainPage>

export type RatingPage = Page<{ [k in MainCharacteristicName]: User[] }>

export type RatingPageSWR = PageSWR<RatingPage>

export type FollowingPage = Page<User[]>

export type FollowingPageSWR = PageSWR<FollowingPage>

export type UserPage = Page<{ favorite: boolean; user: UserDetail }>

export type UserPageSWR = PageSWR<UserPage>

export interface UserDetail extends User {
  favorite: boolean
  goals: Goal[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
