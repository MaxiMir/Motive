import { DayDto } from '../day'
import { fetcher } from '../fetcher'
import { CreateMemberDto, MemberDto, UpdateMemberDto } from './dto'

export function createMember(data: CreateMemberDto): Promise<MemberDto> {
  return fetcher.post('/members', data)
}

export function updateMember({ id, ...data }: UpdateMemberDto): Promise<MemberDto> {
  return fetcher.patch(`/members/${id}`, data)
}

export function deleteMember(id: number): Promise<void> {
  return fetcher.delete(`/members/${id}`)
}

export function getMemberDay(id: number, dayId: number): Promise<DayDto> {
  return fetcher.get(`/members/${id}/days/${dayId}`)
}
