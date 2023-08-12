export interface TaskDto {
  readonly id: number
  readonly name: string
  readonly date: string | null
  readonly completed: boolean
  readonly completedByOthers: boolean
}

export interface CreateTaskDto extends Pick<TaskDto, 'name'> {
  readonly key: string
  readonly date?: Date
}
