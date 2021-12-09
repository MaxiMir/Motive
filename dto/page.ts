import { Client, User } from './user'
import { MainCharacteristic } from './characteristic'
import { Role } from './role'
import { Goal } from './goal'

export type PageSWR<T> = {
  fallbackData: Page<T>
}

export type Page<T> = {
  meta: {
    title: string
    description: string
    keywords: string
    url: string
    type: string
  }
  client: Client
  href: string
} & T

export type MainPage = Page<null>

export type RatingPage = Page<{ [k in MainCharacteristic]: User[] }>

export type FavoritesPage = Page<{ favorites: User[] }>

export type UserPage = Page<{ user: UserDetail }>

export interface UserDetail extends User {
  views: number
  favorite: boolean
  role: Role
  goals: Goal[]
}

export interface DataWithPagination<T> {
  content: T
  last: boolean
}
