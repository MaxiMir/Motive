import { CreateMemberDto, MemberDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const createMember = (data: CreateMemberDto): Promise<MemberDto> => {
  return fetcher.post('/members', data)
}
