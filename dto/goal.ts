import { DayCharacteristicDto, GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'

export interface GoalCreationDto {
  name: string
  hashtags: string
  map: string[]
  tasks: TaskCreationDto[]
}

export interface GoalDto {
  id: number
  name: string
  started: string
  hashtags: string[]
  map: string[]
  current: number | null
  owner: UserBaseDto
  characteristic: GoalCharacteristicDto
  days: DayDto[]
  calendar: CalendarDto[]
}

export interface DayCreationDto {
  id: number
  tasks: TaskCreationDto[]
}

export interface DayDto {
  id: number
  date: string
  characteristic: DayCharacteristicDto | null
  tasks: TaskDto[]
  topicCount: number
  feedback: FeedbackDto | null
  views: number
}

export interface TaskCreationDto {
  name: string
  date?: Date
}

export interface TaskDto {
  id: number
  name: string
  date: string | null
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
