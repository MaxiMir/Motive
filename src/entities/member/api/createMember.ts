import fetcher from '@shared/api/fetcher'
import { CreateMemberDto, MemberDto } from '@shared/model/member'

export const createMember = (data: CreateMemberDto): Promise<MemberDto> => {
  return fetcher.post('/members', data)
}
