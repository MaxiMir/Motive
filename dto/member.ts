export interface CreateMemberDto {
  readonly goalId: number
  readonly dayId: string
}

export interface UpdateMemberDto {
  readonly dayId: string
  readonly date: Date
}

export interface MemberDto {
  readonly id: number
  readonly completedTasks: number[]
  readonly goalId: number
  readonly dayId: number
  readonly userId: number
  readonly lastEndOfDay: string | null
}

export interface OwnershipDto {
  readonly page: boolean
  readonly goal: boolean
  readonly member?: MemberDto
}
