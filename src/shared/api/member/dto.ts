export interface MemberDto {
  readonly id: number
  readonly completedTasks: number[]
  readonly goalId: number
  readonly dayId: number
  readonly userId: number
  readonly started: string
  readonly updated: string
}

export interface CreateMemberDto extends Pick<MemberDto, 'goalId'> {
  readonly started: Date
  readonly dayId?: string
}

export interface UpdateMemberDto extends Pick<MemberDto, 'id' | 'dayId'> {
  readonly updated: Date
}
