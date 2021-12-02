import { DayCharacteristics, GoalCharacteristics } from './characteristic'
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
  started: string
  hashtags: string[]
  owner: UserBase
  role: Role
  characteristics: GoalCharacteristics // count all
  day: Day
  datesMap: Record<string, string> // { [formattedDate]: dayId }
}

interface Day {
  id: string
  date: string
  characteristics: DayCharacteristics
  tasks: Task[]
  discussionCount: number
  feedbackId: string | null
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
  video: string | null
}

export interface Photo {
  src: string
  width: number
  height: number
}
