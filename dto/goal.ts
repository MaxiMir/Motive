import { DayCharacteristic, GoalCharacteristic } from './characteristic'
import { UserBase } from './user'

export interface GoalCreation {
  name: string
  hashtags: string[]
  tasks: Array<Omit<Task, 'id' | 'completed' | 'completedByOthers'>>
}

export interface Goal {
  id: number
  name: string
  started: string
  hashtags: Hashtag[]
  owner: UserBase
  characteristic: GoalCharacteristic // count all
  days: Day[]
}

export interface Hashtag {
  id: number
  name: string
  views: number
}

interface Day {
  id: number
  date: string
  characteristic: DayCharacteristic | null
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

export interface Calendar {
  id: number
  date: string
}
