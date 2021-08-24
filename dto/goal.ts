import { GoalCharacteristics } from './characteristic'
import { Role } from './role'

export interface Goal {
  id: string
  name: string
  href: string
  started: string
  hashtags: string[]
  role: Role
  characteristics: GoalCharacteristics
  tasks: Task[]
}

export interface Task {
  id: string
  name: string
  date?: string
  completed: boolean
  completedByOthers: boolean
}

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed' | 'completedByOthers'>>
}
