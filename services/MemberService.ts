import Axios from 'lib/axios'
import { CreateMemberDto, UpdateMemberDto } from 'dto'

export default class MemberService {
  static create(data: CreateMemberDto): Promise<void> {
    return Axios.post('/members', data)
  }

  static update(id: number, data: UpdateMemberDto): Promise<void> {
    return Axios.patch(`/members/${id}`, data)
  }

  static delete(id: number): Promise<void> {
    return Axios.delete(`/members/${id}`)
  }
}
