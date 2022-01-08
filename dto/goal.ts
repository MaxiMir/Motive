import { DayCharacteristicDto, GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'

export interface GoalCreationDto {
  name: string
  hashtags: string[]
  tasks: Array<Omit<TaskDto, 'id' | 'completed' | 'completedBy'>>
}

export interface GoalDto {
  id: number
  name: string
  started: string
  hashtags: string[]
  owner: UserBaseDto
  characteristic: GoalCharacteristicDto // count all
  days: DayDto[]
}

export interface DayDto {
  id: number
  date: string
  characteristic: DayCharacteristicDto | null
  tasks: TaskDto[]
  discussionCount: number
  feedbackId: number | null
  views: number
}

export interface TaskDto {
  id: number
  name: string
  date?: string
  completed: boolean
  completedBy: number[]
}

export interface FeedbackDto {
  text: string | null
  photos: PhotoDto[] | null
  video: string | null
}

export interface PhotoDto {
  src: string
  width: number
  height: number
}

export interface CalendarDto {
  id: number
  date: string
}
