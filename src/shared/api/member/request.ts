import { DayDto } from '../day'
import { fetcher } from '../fetcher'
import { CreateMemberDto, MemberDto, UpdateMemberDto } from './dto'

export function createMember(dto: CreateMemberDto): Promise<MemberDto> {
  return fetcher.post('/members', dto)
}

export function updateMember(id: number, dto: UpdateMemberDto): Promise<MemberDto> {
  return fetcher.patch(`/members/${id}`, dto)
}

export function deleteMember(id: number): Promise<void> {
  return fetcher.delete(`/members/${id}`)
}

export function getMemberDay(id: number, dayId: number): Promise<DayDto> {
  return fetcher.get(`/members/${id}/days/${dayId}`)
}
