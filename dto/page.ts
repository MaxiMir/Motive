import { Client, User } from './user'
import { MainCharacteristicName } from './characteristic'
import { Role } from './role'
import { Goal } from './goal'
import { Preferences } from './preferences'

export type PageSWR<T> = {
  fallbackData: T
}

type Page<T> = {
  client?: Client
  content: T
}

export type MainPage = Page<null>

export type RatingPage = Page<{ [k in MainCharacteristicName]: User[] }>

export type FavoritesPage = Page<User[]>

export type UserPage = Page<UserDetail>

export interface UserDetail extends User {
  preferences: Preferences
  role: Role
  goals: Goal[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
