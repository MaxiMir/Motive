import { UserCharacteristics } from './characteristic'
import { Goal } from './goal'
import { Role } from './role'

export interface User {
  id: string
  firstName: string
  lastName: string
  href: string
  avatar: string
  characteristics: UserCharacteristics
}

export interface UserDetail extends User {
  views: number
  favorite: boolean
  role: Role
  goals: Goal[]
}

export interface Client {
  id: string
  isAuthenticated: boolean
}
