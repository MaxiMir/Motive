import { DayCharacteristicDto, GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'
import { ReactionsDto } from './reaction'

export interface GoalCreationDto {
  name: string
  hashtags: string
  stages: string[]
  tasks: TaskCreationDto[]
}

export interface GoalDto {
  id: number
  name: string
  started: string
  hashtags: string[]
  stages: string[]
  stage: number
  owner: UserBaseDto
  characteristic: GoalCharacteristicDto
  day: DayDto
  calendar: CalendarDto[]
  reactions: ReactionsDto
}

export type CreatedGoal = Omit<GoalDto, 'day'> & { days: DayDto[] }

export interface GoalStageDto {
  id: number
  stage: number
}

export interface DayCreationDto {
  id: number
  tasks: TaskCreationDto[]
}

export interface DayDto {
  id: number
  stage: number
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
