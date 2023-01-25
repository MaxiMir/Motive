import { CreateMemberDto, MemberDto } from '@shared/api/member'
import { fetcher } from '@shared/config'

export const createMember = (data: CreateMemberDto): Promise<MemberDto> => {
  return fetcher.post('/members', data)
}
