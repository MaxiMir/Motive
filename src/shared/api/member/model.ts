export interface CreateMemberDto {
  readonly started: Date
  readonly goalId: number
  readonly dayId?: string
}

export interface UpdateMemberDto {
  readonly id: number
  readonly dayId: number
  readonly updated: Date
}

export interface MemberDto {
  readonly id: number
  readonly completedTasks: number[]
  readonly goalId: number
  readonly dayId: number
  readonly userId: number
  readonly started: string
  readonly updated: string
}
