import { DayCharacteristic, GoalCharacteristic } from './characteristic'
import { UserBase } from './user'
import { Role } from './role'

export interface GoalCreation {
  name: string
  hashtags?: string
  tasks: Array<Omit<Task, 'id' | 'completed' | 'completedByOthers'>>
}

export interface Goal {
  id: number
  name: string
  started: string
  hashtags: string[]
  owner: UserBase
  role: Role
  characteristic: GoalCharacteristic // count all
  day: Day
  datesMap: Record<string, number> // { [formattedDate]: dayId }
}

interface Day {
  id: number
  date: string
  characteristic: DayCharacteristic
  tasks: Task[]
  discussionCount: number
  feedbackId: number | null
  views: number
}

export interface Task {
  id: number
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
