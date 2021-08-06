import { User, UserDetail } from './user'
import { Characteristic } from './characteristic'

export type Page<T> = {
  meta: {
    title: string
    description: string
    keywords: string
    url: string
    type: string
  }
} & T

export type MainPage = Page<undefined>

export type RatingPage = Page<
  {
    [k in 'motivation' | 'creativity' | 'support']: {
      list: User[]
      type: Characteristic
    }
  }
>

export type FavoritesPage = Page<{ favorites: User[] }>

export type UserPage = Page<{ user: UserDetail }>
