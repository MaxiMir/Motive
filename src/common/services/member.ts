import { service } from '@utils/service'
import { CreateMemberDto, MemberDto, UpdateMemberDto } from '@dto'

export class MemberService {
  static create(data: CreateMemberDto): Promise<MemberDto> {
    return service.post('/members', data)
  }

  static update(dto: UpdateMemberDto): Promise<MemberDto> {
    const { id, ...data } = dto

    return service.patch(`/members/${id}`, data)
  }

  static delete(id: number): Promise<void> {
    return service.delete(`/members/${id}`)
  }
}
