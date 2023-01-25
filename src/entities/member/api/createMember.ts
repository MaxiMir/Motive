import fetcher from '@shared/config/fetcher'
import { CreateMemberDto, MemberDto } from '@shared/api/member'

export const createMember = (data: CreateMemberDto): Promise<MemberDto> => {
  return fetcher.post('/members', data)
}
