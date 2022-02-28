import { DayCharacteristicDto, GoalCharacteristicDto } from './characteristic'
import { UserBaseDto } from './user'
import { ReactionsDto } from './reaction'

export interface CreateGoalDto {
  name: string
  started: Date
  hashtags: string
  stages: string[]
  date: Date
  tasks: CreateTaskDto[]
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

export interface GoalCompletedDto extends GoalDto {
  confirmation: ConfirmationDto
}

export type CreatedGoal = Omit<GoalDto, 'day'> & { days: DayDto[] }

export interface GoalStageDto {
  id: number
  stage: number
}

export interface CreateDayDto {
  id: number
  date: Date
  tasks: CreateTaskDto[]
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

export interface CreateTaskDto {
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

export interface ConfirmationDto extends FeedbackDto {
  date: string
}

export interface PhotoDto {
  src: string
  width: number
  height: number
}

export interface PhotoWithSourceDto extends PhotoDto {
  source: string
}

export interface CalendarDto {
  id: number
  date: string
}
