import { DayDto } from '../day'
import { fetcher } from '../fetcher'
import { CreateMemberDto, MemberDto, UpdateMemberDto } from './model'

export const createMember = (data: CreateMemberDto): Promise<MemberDto> => {
  return fetcher.post('/members', data)
}

export const updateMember = ({ id, ...data }: UpdateMemberDto): Promise<MemberDto> => {
  return fetcher.patch(`/members/${id}`, data)
}

export const deleteMember = (id: number): Promise<void> => {
  return fetcher.delete(`/members/${id}`)
}

export const getMemberDay = (id: number, dayId: number): Promise<DayDto> => {
  return fetcher.get(`/members/${id}/days/${dayId}`)
}
