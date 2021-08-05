import { GoalCharacteristics } from './characteristic'

export interface Goal {
  id: string
  name: string
  href: string
  started: string
  hashtags: string[]
  characteristics: GoalCharacteristics
  tasks: Task[]
}

export interface Task {
  id: string
  name: string
  date?: string
  completed: boolean
}

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed'>>
}
