import { FRONTEND_ID } from 'shared/config'

export const PRIORITIES = ['low', 'medium', 'high'] as const

export type PriorityDto = (typeof PRIORITIES)[number]

export interface TaskDto {
  readonly id: number
  readonly name: string
  readonly description: string | null
  readonly priority: PriorityDto | null
  readonly date: string | null
  readonly completed: boolean
  readonly completedByOthers: boolean
}

export interface CreateTaskDto extends Pick<TaskDto, 'name' | 'description' | 'priority'> {
  readonly [FRONTEND_ID]: string
  readonly date: Date | null
}
