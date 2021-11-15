import { Client, User } from './user'
import { UserCharacteristic } from './characteristic'
import { Role } from './role'
import { Goal } from './goal'

export type PageSWR<T> = {
  fallbackData: Page<T>
}

type Page<T> = {
  meta: {
    title: string
    description: string
    keywords: string
    url: string
    type: string
  }
  client: Client
} & T

export type MainPage = Page<{ [k: string]: never }>

export type RatingPage = Page<
  {
    [k in 'motivation' | 'creativity' | 'support']: {
      list: User[]
      characteristic: UserCharacteristic
    }
  }
>

export type FavoritesPage = Page<{ favorites: User[] }>

export type UserPage = Page<{ user: UserDetail }>

export interface UserDetail extends User {
  views: number
  favorite: boolean
  role: Role
  goals: Goal[]
}
