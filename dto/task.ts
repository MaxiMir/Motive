export interface CreateTaskDto {
  readonly name: string
  readonly date?: Date
}

export interface TaskDto {
  readonly id: number
  readonly name: string
  readonly date: string | null
  readonly completed: boolean
  readonly completedByOther: boolean
}
