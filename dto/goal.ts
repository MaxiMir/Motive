import { GoalCharacteristics } from './characteristic'
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
  role: Role
  characteristics: GoalCharacteristics
  tasks: Task[]
  feedback: Feedback
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
  photos: string[] | null
  videos: string[] | null
}
