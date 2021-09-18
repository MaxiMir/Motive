import { Client, User, UserDetail } from './user'
import { UserCharacteristic } from './characteristic'

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
