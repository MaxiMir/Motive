import { FRONTEND_ID } from 'shared/config'

export interface TaskDto {
  readonly id: number
  readonly name: string
  readonly date: string | null
  readonly completed: boolean
  readonly completedByOthers: boolean
}

export interface CreateTaskDto extends Pick<TaskDto, 'name'> {
  readonly [FRONTEND_ID]: string
  readonly date?: Date
}
