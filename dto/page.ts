import { Client, User } from './user'
import { MainCharacteristicName } from './characteristic'
import { Role } from './role'
import { Goal } from './goal'

export type PageSWR<T> = {
  fallbackData: T
}

interface Meta {
  title: string
  description: string
  keywords: string
  url: string
  type: string
  href: string
}

type Page<T> = {
  meta: Meta
  client: Client
  content: T
}

export type MainPage = Page<null>

export type RatingPage = Page<{ [k in MainCharacteristicName]: User[] }>

export type FavoritesPage = Page<User[]>

export type UserPage = Page<UserDetail>

export interface UserDetail extends User {
  favorite: boolean
  role: Role
  goals: Goal[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
