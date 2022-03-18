import Axios from 'lib/axios'
import { CreateMemberDto, MemberDto, UpdateMemberDto } from 'dto'

export default class MemberService {
  static create(data: CreateMemberDto): Promise<MemberDto> {
    return Axios.post('/members', data)
  }

  static update(dto: UpdateMemberDto): Promise<MemberDto> {
    const { id, ...data } = dto

    return Axios.patch(`/members/${id}`, data)
  }

  static delete(id: number): Promise<void> {
    return Axios.delete(`/members/${id}`)
  }
}