export interface CreateMemberDto {
  readonly goalId: number
  readonly dayId: string
}

export interface Member {
  readonly id: number
  readonly completedTasks: number[]
  readonly goalId: number
  readonly dayId: number
  readonly userId: number
}
