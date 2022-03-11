import Axios from 'lib/axios'
import { CreateMemberDto } from 'dto'

export default class MemberService {
  static add(data: CreateMemberDto): Promise<void> {
    return Axios.post(`/members`, data)
  }
}
