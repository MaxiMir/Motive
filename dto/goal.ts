import { GoalCharacteristics, GoalCharacteristicsWithUsers } from './characteristic'
import { UserBase } from './user'
import { Role } from './role'

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed' | 'completedByOthers'>>
}

export interface Goal {
  id: string
  name: string
  href: string
  started: string
  hashtags: string[]
  owner: UserBase
  role: Role
  characteristics: GoalCharacteristics
  day: Day
  dates: Array<{ id: string; date: string }>
}

interface Day {
  id: string
  date: string
  characteristics: GoalCharacteristicsWithUsers
  tasks: Task[]
  messageCount: number
}

export interface Task {
  id: string
  name: string
  date?: string
  completed: boolean
  completedByOthers: boolean
}

export interface Feedback {
  text: string | null
  photos: Photo[] | null
  videos: string[] | null
}

export interface Photo {
  src: string
  width: number
  height: number
}
