export interface CreateMemberDto {
  readonly goalId: number
  readonly dayId: string
}

export interface MemberDto {
  readonly id: number
  readonly completedTasks: number[]
  readonly goalId: number
  readonly dayId: number
  readonly userId: number
}
