import { MemberDto } from 'shared/api'

export interface Viewer {
  readonly id: number
  readonly nickname: string
  readonly name: string
  readonly avatar: string | null
}

export interface ViewerPart {
  page: boolean
  goal: boolean
  member?: MemberDto
}
