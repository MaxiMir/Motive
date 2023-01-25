import fetcher from '@shared/config/fetcher'
import { MemberDto, UpdateMemberDto } from '@shared/api/member'

export const updateMember = ({ id, ...data }: UpdateMemberDto): Promise<MemberDto> => {
  return fetcher.patch(`/members/${id}`, data)
}
