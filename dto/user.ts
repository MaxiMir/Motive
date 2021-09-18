import { UserCharacteristics } from './characteristic'
import { Goal } from './goal'

export interface User {
  id: string
  name: string
  href: string
  avatar: string
  characteristics: UserCharacteristics
}

export interface UserDetail extends User {
  views: number
  favorite: boolean
  owner: boolean
  goals: Goal[]
}

export interface Client {
  isAuthenticated: boolean
}
