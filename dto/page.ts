import { Client, User, UserBase } from './user'
import { MainCharacteristicName } from './characteristic'
import { Goal } from './goal'

export type PageSWR<T> = {
  fallbackData: T
}

type Page<T> = {
  client?: Client
  content: T
}

export type MainPage = Page<null>

export type RatingPage = Page<{ [k in MainCharacteristicName]: User[] }>

export type RatingPageSWR = PageSWR<RatingPage>

export type FavoritesPage = Page<User[]>

export type FavoritesPageSWR = PageSWR<FavoritesPage>

export type UserPage = Page<UserDetail>

export interface UserDetail extends User {
  favorites: UserBase[]
  goals: Goal[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
