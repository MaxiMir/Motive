import { Goal } from './goal'
import { Characteristics } from './characteristic'

export interface User {
  id: string
  name: string
  href: string
  avatar: string
  characteristics: Characteristics
}

export type Role = 'OWNER' | 'MEMBER'

export interface UserDetail extends User {
  isFavorite: boolean
  views: number
  goals: Array<Goal>
  role: Role
}
