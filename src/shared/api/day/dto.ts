import { FeedbackDto } from '../feedback'
import { CreateTaskDto, TaskDto } from '../task'

export interface DayDto {
  readonly id: number
  readonly stage: number
  readonly date: string
  readonly characteristic: Readonly<{ motivation: number; creativity: number }> | null
  readonly tasks: TaskDto[]
  readonly topicCount: number
  readonly feedback: FeedbackDto | null
  readonly views: number
}

export interface CreateDayDto {
  readonly id: number
  readonly date: string
  readonly tasks: CreateTaskDto[]
}

export const DAY_CHARACTERISTIC = ['motivation', 'creativity'] as const

export type DayCharacteristicName = (typeof DAY_CHARACTERISTIC)[number]

export interface DayCharacteristicUpdateDto {
  readonly id: number
  readonly dayId: number
  readonly name: DayCharacteristicName
  readonly add: boolean
}
