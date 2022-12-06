import { CreateMemberDto, MemberDto, UpdateMemberDto } from '@dto'
import fetcher from '@lib/fetcher'

export default class MemberService {
  static create(data: CreateMemberDto): Promise<MemberDto> {
    return fetcher.post('/members', data)
  }

  static update(dto: UpdateMemberDto): Promise<MemberDto> {
    const { id, ...data } = dto

    return fetcher.patch(`/members/${id}`, data)
  }

  static delete(id: number): Promise<void> {
    return fetcher.delete(`/members/${id}`)
  }
}
