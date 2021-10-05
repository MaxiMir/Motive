import { GoalCharacteristics, GoalCharacteristicsWithUsers } from './characteristic'
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
  owner: Owner
  role: Role
  characteristics: GoalCharacteristics
  day: Day
  dates: Array<{ id: string; date: string }>
}

export interface Owner {
  id: string
  firstName: string
  lastName: string
  avatar: string
  href: string
}

interface Day {
  id: string
  date: string
  characteristics: GoalCharacteristicsWithUsers
  tasks: Task[]
  feedback: Feedback
  discussion: number
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
